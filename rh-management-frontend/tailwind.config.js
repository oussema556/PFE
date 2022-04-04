const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.slate,
        green: colors.emerald,
        purple: colors.violet,
        yellow: colors.amber,
        pink: colors.fuchsia,
        blueGray: colors.blueGray,
        intuitivBlue: {
          100: "#d5dafb",
          200: "#acb5f7",
          300: "#8291f3",
          400: "#596cef",
          500: "#2f47eb",
          600: "#2639bc",
          700: "#1c2b8d",
          800: "#131c5e",
          900: "#090e2f",
        },
        intuitivOrange: {
          100: "#ffdbd7",
          200: "#ffb7af",
          300: "#ff9387",
          400: "#ff6f5f",
          500: "#ff4b37",
          600: "#cc3c2c",
          700: "#992d21",
          800: "#661e16",
          900: "#330f0b"
},
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
