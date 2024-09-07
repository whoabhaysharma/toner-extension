/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include your React source files
    "./src/content/Content.js" // Include your content script
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

