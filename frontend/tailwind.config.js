/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        IFkicaLight: ['IF Kica Light'],
        IFkicaMedium: ['IF Kica Bold'],
        IFkicaBold: ['IF Kica Regular'],
      },
      colors: {
        primary: "#da1818",
        secondary: '#f3f3f3',
        tertiary: "#000",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #090325",
      },
    },
    screens: {
      'xl' : {'max': '1200px'},
      'lg' : {'max': '991px'},
      'md' : {'max': '767px'},
      'sm' : {'max': '550px'},
      'xsm' : {'max': '375px'},
      'xxsm' : {'max': '350px'},
  },
  },
  plugins: [],
}

