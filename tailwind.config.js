/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"PT Sans"', "sans-serif"],
      },
      colors: {
        primary: "black",
        noteBlue: "blue-100",
        noteGreen: "green-500",
        notePurple: "purple-100",
        noteOrange: "orange-100",
      },
    },
  },
  plugins: [],
};
