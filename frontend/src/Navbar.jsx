import React from 'react';

const Navbar = ({ setCurrentView }) => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 
          className="text-3xl font-bold text-gray-900 cursor-pointer"
          onClick={() => setCurrentView('home')}
        >
          Happier Cinema
        </h1>
        <div className="space-x-4">
          <span 
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            Home
          </span>
          <span 
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={() => setCurrentView('explore')}
          >
            Explore
          </span>
          <span 
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={() => setCurrentView('about')}
          >
            About
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
