import React from 'react';
import { HiHome, HiMiniQuestionMarkCircle, HiMagnifyingGlass } from "react-icons/hi2";

const Navbar = ({ setCurrentView }) => {
  return (
    <nav className="bg-neutral-light shadow">
      <div className="max-w-full mx-4 sm:mx-8 lg:mx-32 px-2 sm:px-4 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 
            className="text-lg sm:text-2xl lg:text-3xl font-bold text-secondary cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            Happier Cinema
          </h1>
        </div>
        <div className="icon-flex flex space-x-2 lg:space-x-16">
          <span 
            className="icon text-lg sm:text-xl lg:text-4xl cursor-pointer flex items-center"
            onClick={() => setCurrentView('home')}
          >
            <HiHome />
          </span>
          <span 
            className="icon text-lg sm:text-xl lg:text-4xl cursor-pointer flex items-center"
            onClick={() => setCurrentView('explore')}
          >
            <HiMagnifyingGlass />
          </span>
          <span  
            className="icon text-lg sm:text-xl lg:text-4xl cursor-pointer flex items-center"
            onClick={() => setCurrentView('about')}
          >
            <HiMiniQuestionMarkCircle />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
