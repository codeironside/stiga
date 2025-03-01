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
        primary: {
          50: '#e0e7ff',
          100: '#c7d2fe',
          200: '#a5b4fc',
          300: '#818cf8',
          400: '#6366f1',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#252489',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Loto', 'Roboto', 'sans-serif'],
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

