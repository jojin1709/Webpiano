import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stage: {
          950: "#08080b",
          900: "#0c0c11",
          800: "#131319",
          700: "#1c1c24",
          600: "#27272f",
          500: "#3a3a44",
        },
        ivory: {
          50: "#faf8f3",
          100: "#f5f1e8",
          200: "#ebe4d3",
        },
        brass: {
          300: "#e3c489",
          400: "#d4ac66",
          500: "#c89b5d",
          600: "#a97f45",
          700: "#8a6636",
        },
        ember: "#c1554a",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        key: "0 1px 0 rgba(0,0,0,0.4), 0 8px 16px -6px rgba(0,0,0,0.5)",
        glow: "0 0 40px -8px rgba(212,172,102,0.45)",
      },
      keyframes: {
        "rise-fade": {
          "0%": { transform: "translateY(0)", opacity: "0.9" },
          "100%": { transform: "translateY(-120px)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "rise-fade": "rise-fade 1.4s ease-out forwards",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
