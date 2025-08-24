/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#141729",
        blackglass: "rgba(15,18,28,0.88)",
        "neon-teal": "#12fff7",
        "neon-cyan": "#15eafc",
        "neon-purple": "#a855f7",
        surface: "#181b2b",
        sidebar: "rgba(18,22,36,0.98)",
        ok: "#24C469",
        advisory: "#ffaf20",
        critical: "#e23646",
      },
      boxShadow: {
        neon: "0 0 8px #12fff7, 0 0 16px #15eafc, 0 0 24px #a855f7",
        "neon-sm": "0 0 4px #12fff7, 0 0 8px #15eafc",
      },
    },
  },
  plugins: [],
};

