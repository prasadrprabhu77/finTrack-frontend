/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        income: "#16A34A",
        expense: "#DC2626",
        warning: "#F59E0B",
        bgLight: "#F8FAFC",
        bgDark: "#020617",
        cardDark: "#0F172A"
      }
    },
  },
  plugins: [],
};
