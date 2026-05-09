/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0b",
        primary: "#6366f1", // Indigo
        secondary: "#a855f7", // Purple
        accent: "#00d2ff", // Cyan neon
        card: "#16161a",
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 210, 255, 0.5)',
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.5)',
      }
    },
  },
  plugins: [],
}
