/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#4A3780',
        'color-primary': '#6356E5',
        'color-secondary': '#B856E5',
        'text-color': '#1F2937',
        'text-secondary': '#6B7280',
        'border-color': '#E5E7EB',
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}