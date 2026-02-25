import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        "soft-card": "0 18px 45px rgba(15, 23, 42, 0.18)"
      },
      fontFamily: {
        display: ["system-ui", "sans-serif"],
        sans: ["system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
