import { audioEngine } from "./audio-engine";
import { midiToNote } from "./note-utils";

type MidiNoteCallback = (note: string, velocity: number) => void;
type MidiNoteOffCallback = (note: string) => void;

class MidiInput {
  private midiAccess: WebMidi.MIDIAccess | null = null;
  private activeInput: WebMidi.MIDIInput | null = null;
  private onNoteOn: MidiNoteCallback | null = null;
  private onNoteOff: MidiNoteOffCallback | null = null;
  private _connected = false;
  private _inputName: string | null = null;

  get connected() {
    return this._connected;
  }

  get inputName() {
    return this._inputName;
  }

  get availableInputs(): { id: string; name: string }[] {
    if (!this.midiAccess) return [];
    return Array.from(this.midiAccess.inputs.values()).map((input) => ({
      id: input.id,
      name: input.name || "Unknown MIDI Device",
    }));
  }

  async requestAccess(): Promise<boolean> {
    if (!navigator.requestMIDIAccess) {
      console.warn("Web MIDI API not supported in this browser");
      return false;
    }
    try {
      this.midiAccess = await navigator.requestMIDIAccess({ sysex: false });
      this.midiAccess.onstatechange = () => this.handleStateChange();
      this.autoConnect();
      return true;
    } catch {
      return false;
    }
  }

  private autoConnect() {
    if (!this.midiAccess) return;
    const inputs = Array.from(this.midiAccess.inputs.values());
    if (inputs.length > 0) {
      this.connectInput(inputs[0].id);
    }
  }

  connectInput(inputId: string) {
    if (!this.midiAccess) return;
    this.disconnect();

    const input = this.midiAccess.inputs.get(inputId);
    if (!input) return;

    this.activeInput = input;
    this._inputName = input.name || "Unknown MIDI Device";
    this._connected = true;
    input.onmidimessage = (event) => this.handleMidiMessage(event);
  }

  disconnect() {
    if (this.activeInput) {
      this.activeInput.onmidimessage = null;
      this.activeInput = null;
    }
    this._connected = false;
    this._inputName = null;
  }

  onNote(callbackOn: MidiNoteCallback, callbackOff: MidiNoteOffCallback) {
    this.onNoteOn = callbackOn;
    this.onNoteOff = callbackOff;
  }

  private handleMidiMessage(event: WebMidi.MIDIMessageEvent) {
    const data = event.data;
    if (!data || data.length < 3) return;

    const status = data[0] & 0xf0;
    const noteNumber = data[1];
    const velocity = data[2] / 127;

    const note = midiToNote(noteNumber);

    if (status === 0x90 && velocity > 0) {
      // Note on
      if (this.onNoteOn) this.onNoteOn(note, velocity);
    } else if (status === 0x80 || (status === 0x90 && velocity === 0)) {
      // Note off
      if (this.onNoteOff) this.onNoteOff(note);
    }
  }

  private handleStateChange() {
    // Reconnect if current device disconnected
    if (this.activeInput && !this.midiAccess?.inputs.has(this.activeInput.id)) {
      this._connected = false;
      this._inputName = null;
      this.activeInput = null;
      this.autoConnect();
    }
  }
}

export const midiInput = new MidiInput();
