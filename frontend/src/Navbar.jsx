import React from 'react';
import { HiHome, HiMiniQuestionMarkCircle, HiMagnifyingGlass } from "react-icons/hi2";

const Navbar = ({ setCurrentView }) => {
  return (
    <nav className="bg-neutral-light shadow">
      <div className="max-w-full mx-32 px-4 py-6 flex items-center">
        <div className="flex-shrink-0">
          <h1 
            className="text-3xl font-bold text-secondary cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            Happier Cinema
          </h1>
        </div>
        <div className="icon-flex ml-auto flex space-x-4">
          <span 
            className="icon"
            onClick={() => setCurrentView('home')}
          >
            <HiHome />
          </span>
          <span 
            className="icon"
            onClick={() => setCurrentView('explore')}
          >
            <HiMagnifyingGlass />
          </span>
          <span  
            className="icon"
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
