/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,vue,ts}',
  ],
  darkMode: ['variant', [
    '@media (prefers-color-scheme: dark) { &:not([data-theme="light"] *) }',
    '&:is([data-theme="dark"] *)',
  ]],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

