module.exports = {
  content: ['./index.html', './pages/*/index.html', './ui/js/*.js'],
  theme: {
    extend: {
      colors: {
        'bn-soft': '#FAF9EE',
        'bn-green': '#1A1A1A',
        'bn-white': '#EEEEEE',
        'bn-black': '#010101',
        'bn-dark': '#1A1A1A',
        forge: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
}
