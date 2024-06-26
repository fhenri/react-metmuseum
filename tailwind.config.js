/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'montserrat': ['montserrat', 'system-ui']
    },
    extend: {
      // Add new colors 
      colors: { 
        'red-met': '#e4002b',
        'dark-bgcolor': '#242424',
      },
    },
  },
  plugins: [],
}

