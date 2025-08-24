module.exports = {
  darkMode: 'class',
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0a0020',
        'card-bg': 'rgba(34, 0, 51, 0.85)',
        'accent-purple': '#a855f7',
        'danger': '#dc2626',
        'info': '#38bdf8',
        'glass': 'rgba(13, 8, 33, 0.83)',
      },
      boxShadow: {
        neonglow: '0 0 12px 2px #a855f7',
      }
    }
  },
  plugins: [],
}
