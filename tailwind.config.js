module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deepBlue: '#222C92',
        softPurple: '#8536A9',
        teal: '#1DB3A6',
      },
      backgroundImage: theme => ({
        'gradient-blue-violet': 'linear-gradient(90deg, #222C92 0%, #1DB3A6 100%)',
        'gradient-sunrise': 'linear-gradient(90deg, #FF6F61 0%, #D5006D 100%)',
      }),
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}