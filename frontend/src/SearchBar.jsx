import React from 'react';

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(); 
    }
  };

  return (
    <div className="mb-6 w-full flex">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Search movies..."
        className="w-full h-12 px-4 border rounded-l-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button 
        onClick={onSearch}
        className="btn h-12 px-4 sm:text-lg focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
