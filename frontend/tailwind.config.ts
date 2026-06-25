import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        border: "var(--border)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        gold: "var(--gold)",
      },
      animation: {
        "fade-slide-up": "fadeSlideUp 0.7s ease forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 4s ease infinite",
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(124,58,237,0.7), 0 0 60px rgba(124,58,237,0.35)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
