/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#FFFFFF",
        "primary-900": "#171717",

        "secondary-200": "#999999",
        "secondary-300": "#818181",
        "secondary-400": "#373737",
        "secondary-500": "#1E1E1E",

        "accent-500": "#FF2E2E",
        "accent-600": "#CE2424",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
