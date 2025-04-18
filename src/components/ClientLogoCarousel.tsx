import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { getAllGalleryItems } from '../api/gallery'; // Import API function

const ClientLogoCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const { items } = await getAllGalleryItems(1, 10); // Fetch first 10 items
        setGalleryItems(items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

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

    fetchGalleryItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="py-12 bg-background-500">
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
              {galleryItems[index] ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.img
                    src={galleryItems[index].imageUrl} // Use imageUrl from galleryItems
                    alt={galleryItems[index].description}
                    className="max-h-24 max-w-full object-contain filter drop-shadow-md"
                    whileHover={{
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 }
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-accent-50/20 to-transparent rotate-180 opacity-60 transform-gpu rounded-b-lg"></div>
                </div>
              ) : null}
            </motion.div>

            <p className="mt-2 text-center text-sm text-neutral-700 font-medium">{logo.alt}</p>
          </div>
        ))}
      </Slider>
      
    </div>
  );
};

export default ClientLogoCarousel;