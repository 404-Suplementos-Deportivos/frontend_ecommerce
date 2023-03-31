/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      'negro': '#1D1D1D',
      'grisOscuro': '#323232',
      'grisMedio': '#424242',
      'grisClaro': '#5B5B5B',
      'grisMuyClaro': '#e6e6e6',
      'verde': '#51C546',
      'amarillo': '#FFB900',
      'rojo': '#F05656',
      'blanco': '#FFF'
    },
    extend: {
      backgroundColor: {
        'negro': '#1D1D1D',
        'grisOscuro': '#323232',
        'grisMedio': '#424242',
        'grisClaro': '#5B5B5B',
        'grisMuyClaro': '#e6e6e6',
        'verde': '#51C546',
        'amarillo': '#FFB900',
        'rojo': '#F05656',
        'blanco': '#FFF'
      },
      borderColor: {
        'negro': '#1D1D1D',
        'grisOscuro': '#323232',
        'grisMedio': '#424242',
        'grisClaro': '#5B5B5B',
        'grisMuyClaro': '#e6e6e6',
        'verde': '#51C546',
        'amarillo': '#FFB900',
        'rojo': '#F05656',
        'blanco': '#FFF'
      },
      textColor: {
        'negro': '#1D1D1D',
        'grisOscuro': '#323232',
        'grisMedio': '#424242',
        'grisClaro': '#5B5B5B',
        'grisMuyClaro': '#e6e6e6',
        'verde': '#51C546',
        'amarillo': '#FFB900',
        'rojo': '#F05656',
        'blanco': '#FFF'
      }
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1080px',
      xl: '1440px',
      xxl: '2160px'
    }
  },
  plugins: [],
}
