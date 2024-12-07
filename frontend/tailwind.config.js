/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          400: "#C1C1C1",
          500: "#808080",
        },
      },
    },
  },
  plugins: [],
};
