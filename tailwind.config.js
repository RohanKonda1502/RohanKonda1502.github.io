/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rose-pine-base': '#faf4ed',
        'rose-pine-surface': '#fffaf3',
        'rose-pine-overlay': '#f2e9e1',
        'rose-pine-muted': '#9893a5',
        'rose-pine-subtle': '#797593',
        'rose-pine-text': '#575279',
        'rose-pine-love': '#b42318',
        'rose-pine-gold': '#ea9d34',
        'rose-pine-rose': '#d7827e',
        'rose-pine-pine': '#286983',
        'rose-pine-foam': '#56949f',
        'rose-pine-iris': '#907aa9',
      }
    },
  },
  plugins: [],
}