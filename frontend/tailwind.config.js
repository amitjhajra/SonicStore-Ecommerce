/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Our brand color used across the store
        sonic: {
          DEFAULT: "#6C63FF",
          dark: "#4B44CC",
        },
      },
    },
  },
  plugins: [],
};
