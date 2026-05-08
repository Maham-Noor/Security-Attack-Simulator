/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          950: "#080a0f",
          900: "#10141d",
          800: "#1d2533",
        },
        signal: {
          500: "#22c55e",
          400: "#4ade80",
        },
      },
      boxShadow: {
        panel: "0 18px 50px rgba(0, 0, 0, 0.32)",
      },
    },
  },
  plugins: [],
};
