import Link from "next/link";
import { Piano, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-stage-950 px-6 text-center text-ivory-100">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #d4ac66, transparent)" }}
      />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brass-500 text-stage-950">
        <Piano className="h-7 w-7" />
      </div>
      <h1 className="relative mt-6 font-display text-6xl font-medium">404</h1>
      <p className="relative mt-3 max-w-md text-ivory-200/70">
        This key doesn&rsquo;t exist on the keyboard. The page you&rsquo;re looking for has been
        moved or never existed.
      </p>
      <Link href="/" className="relative mt-8">
        <Button size="lg">
          <Home className="h-4 w-4" /> Back to home
        </Button>
      </Link>
    </div>
  );
}
