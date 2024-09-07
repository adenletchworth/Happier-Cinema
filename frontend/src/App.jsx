import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Explore from './Explore';
import About from './About';

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
