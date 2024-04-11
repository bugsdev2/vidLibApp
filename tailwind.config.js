/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9B3922",
        lightred: "#F2613F",
        darkred: "#481E14",
        dark: "#0C0C0C",
        light: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
