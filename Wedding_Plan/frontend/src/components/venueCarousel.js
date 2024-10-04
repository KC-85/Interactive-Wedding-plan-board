import React from 'react';
import Slider from 'react-slick';
import ;  // Import styles if placed in `styles` folder

const VenueCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="venue-carousel-container">
      <h2>Choose a Wedding Venue Theme</h2>
      <Slider {...settings}>
        <div className="venue-item">
          <img src="assets/images/garden-venue.jpg" alt="Garden Venue Theme" />
          <h3>Garden Venue Theme</h3>
        </div>
        <div className="venue-item">
          <img src="assets/images/beach-venue.jpg" alt="Beach Venue Theme" />
          <h3>Beach Venue Theme</h3>
        </div>
        <div className="venue-item">
          <img src="assets/images/castle-venue.jpg" alt="Castle Venue Theme" />
          <h3>Castle Venue Theme</h3>
        </div>
        {/* Add more items here */}
      </Slider>
    </div>
  );
};

export default VenueCarousel;
