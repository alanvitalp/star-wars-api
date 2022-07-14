/* eslint-disable prettier/prettier */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      stars: 'Pathway Gothic One, sans-serif'
    },
    extend: {
      colors: {
        brand: {
          300: '#996DFF',
          500: '#8257e6'
        },
        primary: {
          100: '#FFE81F',
        },
        gray: {
          500: '#aaa',
        }
      },
    }
  },
  plugins: [require('@tailwindcss/typography'), require('autoprefixer')]
}
