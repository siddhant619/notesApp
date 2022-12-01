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
      },
    },
  },
  plugins: [],
};
