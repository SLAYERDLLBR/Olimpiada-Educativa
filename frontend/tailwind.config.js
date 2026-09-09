/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#0a1428",
          800: "#1a3a52",
          700: "#2a5a7f",
        },
        accent: {
          orange: "#ff6600",
          pink: "#ff006e",
          purple: "#b923ff",
          cyan: "#00d9ff",
        },
        success: "#27ae60",
        warning: "#f39c12",
        danger: "#e74c3c",
        team: {
          red: "#e74c3c",
          blue: "#3498db",
          yellow: "#f39c12",
          green: "#27ae60",
          purple: "#9b59b6",
          orange: "#e67e22",
          cyan: "#1abc9c",
        },
      },
      fontFamily: {
        heading: ["Audiowide", "Orbitron", "sans-serif"],
        body: ["Inter", "Roboto", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        h1: ["64px", { lineHeight: "1.2", letterSpacing: "0.05em" }],
        h2: ["48px", { lineHeight: "1.3", letterSpacing: "0.05em" }],
        h3: ["36px", { lineHeight: "1.4", letterSpacing: "0.05em" }],
        h4: ["28px", { lineHeight: "1.5", letterSpacing: "0.05em" }],
      },
      boxShadow: {
        neon: "0 0 20px rgba(185, 35, 255, 0.5)",
        "neon-intense": "0 0 40px rgba(185, 35, 255, 0.8)",
        "neon-glow": "0 0 60px rgba(255, 102, 0, 0.6)",
        "inner-neon": "inset 0 0 20px rgba(185, 35, 255, 0.2)",
      },
      backgroundImage: {
        "gradient-military": "linear-gradient(135deg, #0a1428 0%, #1a3a52 100%)",
        "gradient-fire": "linear-gradient(45deg, #ff6600 0%, #ff8533 100%)",
        "gradient-neon": "linear-gradient(90deg, #b923ff 0%, #ff006e 100%)",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(185, 35, 255, 0.5)" },
          "50%": { boxShadow: "0 0 60px rgba(185, 35, 255, 0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-30px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3s infinite",
        float: "float 6s ease-in-out infinite",
        "scan-lines": "scan 8s linear infinite",
      },
    },
  },
  plugins: [],
};
