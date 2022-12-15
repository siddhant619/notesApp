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
        noteblue: "#cbf0f8",
        notegreen: "#ccff90",
        notepurple: "#d7aefb",
        notered: "#ffb3b3",
      },
    },
  },
  plugins: [],
};
