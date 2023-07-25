/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "780px" },
        widescreen: { min: "780px" },
      },
      colors: {
        primary: "#0066b2",
        secondary: "#40e0d0",
        background: "#000000",
        foreground: "#ebecee",
        front: "#ffffff",
        back: "#000000",
      },
      borderRadius: {
        inherit: "inherit",
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        raleway: '"Raleway", sans-serif',
      },
      zIndex: {
        1: 1,
      },
      transitionDuration: {
        inherit: "inherit",
      },
    },
  },
  plugins: [],
};
