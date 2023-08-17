/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': 'url(/src/img/bg1.png)',
        'bg2': 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,100)), url(/src/img/bg2.png)',
        'battle': 'url(/src/img/bg2.png)',
        'battleBlur': 'url(/src/img/bg2.png)',
      },
      colors: {
        'primary': '#3C4051',
        'point': '#5BDFCA',
        'primaryDark': '#323543',
        'red': '#FF5959',
        'green': '#4Dff89',
      },
    },
  },
  plugins: [],
}