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
    <div className="mb-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Search movies..."
        className="w-full h-12 px-4 border search-box"
      />
    </div>
  );
};

export default SearchBar;
