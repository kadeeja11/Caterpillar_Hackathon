import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        brand: {
          DEFAULT: "#f7b500", // Caterpillar yellow
          dark: "#c79100",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // required for shadcn/ui transitions
  ],
}
