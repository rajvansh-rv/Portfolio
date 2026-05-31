/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#030303",
        bgCharcoal: "#0a0a0a",
        cardBg: "rgba(10, 10, 10, 0.6)",
        accentBlue: "#3b82f6",
        accentPurple: "#a855f7",
        textPrimary: "#f5f5f7",
        textSecondary: "#86868b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-glow": "0 8px 32px 0 rgba(168, 85, 247, 0.15)",
        "blue-glow": "0 0 40px rgba(59, 130, 246, 0.2)",
        "purple-glow": "0 0 40px rgba(168, 85, 247, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
}
