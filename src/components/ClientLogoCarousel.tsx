import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

const ClientLogoCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const logos = [
    { src: '/l1.jpg', alt: 'Client 1' },
    { src: '/l2.jpg', alt: 'Client 2' },
    { src: '/l3.jpg', alt: 'Client 3' },
    { src: '/l4.jpg', alt: 'Client 4' },
    { src: '/l5.jpg', alt: 'Client 5' },
      { src: '/l6.jpg', alt: 'Client 6' },
    { src: '/l7.jpg', alt: 'Client 7' },
    // Add more logos as needed
  ];

  return (
    <div className="p-6 bg-background-500 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center animate-slide-down">Our Trusted Partners</h2>
      
      <Slider {...settings} className="logo-carousel">
        {logos.map((logo, index) => (
          <div 
            key={index} 
            className="px-4 focus:outline-none"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden p-4 h-40 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateY: hoveredIndex === index ? 15 : 0,
                scale: hoveredIndex === index ? 1.05 : 1,
                z: hoveredIndex === index ? 20 : 0
              }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px",
                boxShadow: hoveredIndex === index 
                  ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px rgba(0, 194, 203, 0.5)" 
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="max-h-24 max-w-full object-contain filter drop-shadow-md"
                  whileHover={{ 
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                />
                
                {/* Reflection effect */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-accent-50/20 to-transparent rotate-180 opacity-60 transform-gpu rounded-b-lg"></div>
                
                {/* Floating particles for 3D effect on hover */}
                {hoveredIndex === index && (
                  <>
                    <motion.div 
                      className="absolute w-2 h-2 rounded-full bg-accent-400"
                      animate={{ 
                        x: [0, 10, -10, 0],
                        y: [0, -15, -5, 0],
                        opacity: [0, 0.8, 0.8, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    />
                    <motion.div 
                      className="absolute w-1 h-1 rounded-full bg-secondary-500"
                      animate={{ 
                        x: [0, -15, 10, 0],
                        y: [0, -10, -20, 0],
                        opacity: [0, 0.6, 0.6, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", delay: 0.3 }}
                    />
                    <motion.div 
                      className="absolute w-2 h-2 rounded-full bg-primary-300"
                      animate={{ 
                        x: [0, 12, -5, 0],
                        y: [0, -8, -15, 0],
                        opacity: [0, 0.7, 0.7, 0]
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop", delay: 0.5 }}
                    />
                  </>
                )}
              </div>
            </motion.div>
            
            <p className="mt-2 text-center text-sm text-neutral-700 font-medium">{logo.alt}</p>
          </div>
        ))}
      </Slider>
      
      {/* Custom navigation with 3D effect */}
      <div className="flex justify-center mt-8 space-x-4">
        <motion.button
          className="px-4 py-2 bg-primary-500 text-white rounded-md shadow-md"
          whileHover={{ 
            scale: 1.05, 
            rotateY: 10,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.querySelector('.slick-prev').click()}
        >
          Previous
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-accent-500 text-white rounded-md shadow-md"
          whileHover={{ 
            scale: 1.05, 
            rotateY: -10,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.querySelector('.slick-next').click()}
        >
          Next
        </motion.button>
      </div>
      
      {/* Custom CSS for better dots styling */}
      <style jsx>{`
        .slick-dots li button:before {
          color: var(--primary-500);
          font-size: 10px;
        }
        .slick-dots li.slick-active button:before {
          color: var(--accent-500);
        }
        .logo-carousel .slick-track {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default ClientLogoCarousel;