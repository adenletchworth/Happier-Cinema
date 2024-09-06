/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {'sans': ['Fredoka', 'sans-serif']},
      colors: {
        primary: {
          DEFAULT: '#4B0082',
          dark: '#311B92',
          light: '#7C4DFF',
        },
        secondary: {
          DEFAULT: '#00BCD4',
          dark: '#0097A7',
          light: '#64FFDA',
        },
        neutral: {
          DEFAULT: '#F5F5F5',
          dark: '#E0E0E0',
          light: '#FFFFFF',
          darkest: '#A9A9A9',
        }
      }
    },
  },
  plugins: [],
}
