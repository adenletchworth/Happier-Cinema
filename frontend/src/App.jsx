import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Explore from './Explore';

const About = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="max-w-2xl text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">About Happier Cinema</h2>
      <p className="text-gray-700 text-lg mb-8">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique totam nostrum a ducimus cum, asperiores sequi veritatis explicabo aspernatur illo fugiat, debitis, odio quae officiis quibusdam eveniet! Necessitatibus ducimus neque accusamus at, earum libero velit, voluptatem possimus ut, nobis dignissimos molestiae! Laboriosam repellendus, nobis non facilis consectetur animi iste ducimus.
      </p>
    </div>
  </div>
);

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setCurrentView={setCurrentView} />;
      case 'explore':
        return <Explore />;
      case 'about':
        return <About />;
      default:
        return <Home setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar setCurrentView={setCurrentView} />
      {renderView()}
    </div>
  );
};

export default App;
