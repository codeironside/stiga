// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#003366',     // Dark blue
//         secondary: '#A8ff76',   // Light green
//         background: '#ffffff',  // White
//         neutral: '#708090',     // Slate gray
//         accent: '#00c2cb',      // Cyan
//       },
//       fontFamily: {
//         sans: ['Loto', 'Roboto', 'sans-serif'],
//       },
//       animation: {
//         'fade-in': 'fadeIn 3.5s ease-in-out',
//         'slide-up': 'slideUp 2.5s ease-in-out',
//         'slide-down': 'slideDown 3.5s ease-in-out',
//         'slide-in-right': 'slideInRight 2.5s ease-in-out',
//         'slide-in-left': 'slideInLeft 4.5s ease-in-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//         slideDown: {
//           '0%': { transform: 'translateY(-20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//         slideInRight: {
//           '0%': { transform: 'translateX(20px)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//         slideInLeft: {
//           '0%': { transform: 'translateX(-20px)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//       },
//     },
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { // Dark blue #003366
          50: '#e0e8f2',
          100: '#b3c2df',
          200: '#8099c9',
          300: '#4d70b3',
          400: '#26519b',
          500: '#003366',
          600: '#002d5a',
          700: '#00254e',
          800: '#001e42',
          900: '#001736',
        },
        secondary: { // Light green #A8ff76
          50: '#f0fff4',
          100: '#d9ffe2',
          200: '#b3ffc2',
          300: '#8cffa2',
          400: '#66ff82',
          500: '#a8ff76',
          600: '#89cc64',
          700: '#6aa052',
          800: '#4b7340',
          900: '#2c472e',
        },
        background: { // White #ffffff
          50: '#ffffff',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fcfcfc',
          400: '#fbfbfb',
          500: '#ffffff',
          600: '#f9f9f9',
          700: '#f7f7f7',
          800: '#f5f5f5',
          900: '#f0f0f0',
        },
        neutral: { // Slate gray #708090
          50: '#f2f3f4',
          100: '#e1e5e8',
          200: '#c2c8ce',
          300: '#a3acb4',
          400: '#84909a',
          500: '#708090',
          600: '#5e6d7d',
          700: '#4c5a6a',
          800: '#3a4757',
          900: '#283444',
        },
        accent: { // Cyan #00c2cb
          50: '#e0f8fa',
          100: '#b3f0f3',
          200: '#80e8ec',
          300: '#4de0e5',
          400: '#26d8de',
          500: '#00c2cb',
          600: '#00a9b2',
          700: '#009099',
          800: '#007780',
          900: '#005e67',
        },
      },
      fontFamily: {
        sans: ['Loto', 'Roboto'],
      },
      animation: {
        'fade-in': 'fadeIn 4.5s ease-in-out',
        'slide-up': 'slideUp 3.5s ease-in-out',
        'slide-down': 'slideDown 4.5s ease-in-out',
        'slide-in-right': 'slideInRight 3.5s ease-in-out',
        'slide-in-left': 'slideInLeft 4.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

