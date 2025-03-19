import React from 'react';
import Slider from 'react-slick';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src="/Rectangle 1.png" alt="Image 1" className="w-full" />
        </div>
        <div>
          <img src="/Rectangle2.png" alt="Image 2" className="w-full" />
        </div>
        {/* Add more images as needed */}
      </Slider>
    </div>
  );
};

export default Carousel;
