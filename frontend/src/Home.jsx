import React from 'react';

const Home = ({ setCurrentView }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Happier Cinema</h2>
        <p className="text-gray-700 text-lg mb-8">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis est adipisci eum qui ipsam, ea fugiat necessitatibus dolores libero voluptatum quaerat aspernatur repudiandae. Amet mollitia facilis, fugit doloremque a qui! Nobis, aut. Cum suscipit quae, totam sequi pariatur nulla fugiat, ipsa iusto assumenda eveniet voluptates dolores qui, atque alias.
        </p>
        <button 
          onClick={() => setCurrentView('explore')}
          className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-500"
        >
          Try Now
        </button>
      </div>
    </div>
  );
};

export default Home;
