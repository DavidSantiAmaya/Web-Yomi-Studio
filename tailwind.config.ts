import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
