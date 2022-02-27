module.exports = {
  purge: {
    content: ["./src/**/*.{htmls,ts}"],
    options: {
      safeList: ["bg-blue-400", "bg-green-400", "bg-red-400"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {},
  },
  variants: {
    extend: { opacity: ["disabled"], backgroundColor: ["disabled"] },
  },
  plugins: [],
};
