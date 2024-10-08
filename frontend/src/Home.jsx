import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; 

import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 

import movie1 from './assets/movie1.jpg';
import movie2 from './assets/movie2.jpg';
import movie3 from './assets/movie3.jpg';
import movie4 from './assets/movie4.jpg';
import movie5 from './assets/movie5.jpg';
import movie6 from './assets/movie6.jpg';
import movie7 from './assets/movie7.jpg';
import movie8 from './assets/movie8.jpg';

const Home = ({ setCurrentView }) => {
  const movies = [
    movie1,
    movie2,
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
    movie8
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-8xl bg-neutral-lightest w-full max-w-6xl mx-auto px-4 mt-2">
      <div className="max-w-full sm:max-w-5xl text-center space-y-3 bg-white rounded-lg shadow-lg p-4 sm:p-8 border border-neutral-dark w-full">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-dark">
          Welcome to <span className="text-secondary">Happier Cinema</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-darkest">
          Discover movies that match your taste, dive deep into our recommendations, and find your next favorite film.
        </p>

        <div className="flex justify-center mt-6 mb-8 px-2 sm:px-12"> 
          <Swiper
            spaceBetween={10} // Reduced space for mobile screens
            slidesPerView={1} // Default to 1 slide on mobile
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 10 }, // 2 slides on small screens
              1024: { slidesPerView: 3, spaceBetween: 20 } // 3 slides on larger screens
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}  
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}  
            className="w-full max-w-full"  
          >
            {movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={movie} 
                  alt={`Movie ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <p className="text-neutral-darkest text-base sm:text-lg">
          Explore a variety of genres and titles curated just for you. Whether you love classics, thrillers, or the latest blockbusters, Happier Cinema is here to guide you.
        </p>
        <div className="mt-4 sm:mt-8">
          <button 
            onClick={() => setCurrentView('explore')}
            className="px-6 sm:px-10 py-3 sm:py-4 btn"
          >
            Start Exploring
          </button>
        </div>
        <p className="text-xs sm:text-sm text-neutral-darkest mt-4">
          No sign-up required. Jump straight in and start discovering.
        </p>
      </div>
    </div>
  );
};

export default Home;
