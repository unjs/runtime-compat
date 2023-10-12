/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

