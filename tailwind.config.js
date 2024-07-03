/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // enable dark mode
  theme: {
    extend: {     
      fontFamily: {
        'dmsans': ['DM Sans', 'sans-serif'],
        'poppins' : ['Poppins']
      },
      colors: {
        accent: '#5D5A88',
        // dark:'#19182E',
        dark:'#0d0c1d'
      },
      fontSize: {
        md: ['15px', '22px'],
      },

    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1000px'
      }
    }   
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
