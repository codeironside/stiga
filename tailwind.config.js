import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Custom arrow components
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary-500/70 text-background-50 transition-all hover:bg-primary-600`}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute left-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary-500/70 text-background-50 transition-all hover:bg-primary-600`}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10 12.77 13.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
      </div>
    );
  };

  // Custom dot component
  const CustomDot = ({ onClick, active }) => {
    return (
      <button
        onClick={onClick}
        className={`mx-1 h-3 w-3 rounded-full transition-all ${active ? 'bg-accent-500 w-6' : 'bg-neutral-300 hover:bg-neutral-400'
          }`}
        aria-label="Carousel navigation dot"
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="bottom-5 flex w-full justify-center">
        <ul className="m-0 flex items-center p-0"> {dots} </ul>
      </div>
    ),
    customPaging: i => <CustomDot active={i === currentSlide} />
  };

  const images = [
    {
      src: "/Rectangle 1.png",
      alt: "Image 1",
      caption: "First Showcase Image",
      description: "Beautiful landscape view captured in high resolution."
    },
    {
      src: "/Rectangle2.png",
      alt: "Image 2",
      caption: "Second Showcase Image",
      description: "Amazing architecture with stunning details."
    },
    {
      src: "https://source.unsplash.com/random/800x400/?nature",
      alt: "Nature Image",
      caption: "Breathtaking Nature",
      description: "Explore the beauty of natural landscapes."
    },
    {
      src: "https://source.unsplash.com/random/800x400/?architecture",
      alt: "Architecture Image",
      caption: "Modern Architecture",
      description: "Innovative designs that push boundaries."
    }
  ];

  return (
    <div className="carousel-container relative mx-auto max-w-4xl overflow-hidden rounded-lg shadow-xl">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <div className="aspect-w-16 aspect-h-9 relative h-[400px] w-full overflow-hidden">
              {/* Using a div with background-image instead of img for better control */}
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url(${image.src})` }}
                aria-label={image.alt}
              />
            </div>

            {/* Caption overlay with animation */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/80 to-transparent p-4 text-background-50">
              <h3 className={`text-xl font-bold ${currentSlide === index ? 'animate-slide-up' : 'opacity-0'}`}>
                {image.caption}
              </h3>
              <p className={`mt-1 text-sm ${currentSlide === index ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      {/* Slide counter */}
      <div className="absolute right-4 top-4 rounded-full bg-primary-500/70 px-3 py-1 text-sm font-medium text-background-50">
        {currentSlide + 1}/{images.length}
      </div>
    </div>
  );
};

export default Carousel;
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

