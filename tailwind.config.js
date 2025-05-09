/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Ensure all your source files are covered
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  // Replace with your desired font
      },
    },
  },
}

