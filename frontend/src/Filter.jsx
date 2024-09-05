import React, { useState } from 'react';

const Filter = ({ genre, setGenre, minCountAverage, setMinCountAverage, afterYear, setAfterYear, beforeYear, setBeforeYear, onSearch }) => {
  return (
    <aside className="grid-default w-full md:w-1/4 mb-6 md:mb-0">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Genres</h3>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full h-12 px-4 border select-box"
        >
          <option value="" disabled>
            Select a genre
          </option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Family">Family</option>
          <option value="Western">Western</option>
          <option value="Crime">Crime</option>
          <option value="Music">Music</option>
          <option value="Mystery">Mystery</option>
          <option value="War">War</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Romance">Romance</option>
          <option value="Fantasy">Fantasy</option>
          <option value="History">History</option>
          <option value="Action">Action</option>
          <option value="TV Movie">TV Movie</option>
          <option value="Thriller">Thriller</option>
          <option value="Comedy">Comedy</option>
          <option value="Documentary">Documentary</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Year</h3>
        <input
          type="number"
          value={afterYear}
          onChange={(e) => setAfterYear(e.target.value)}
          placeholder="From"
          className="w-full h-12 px-4 border input-box mb-3"
        />
        <input
          type="number"
          value={beforeYear}
          onChange={(e) => setBeforeYear(e.target.value)}
          placeholder="To"
          className="w-full h-12 px-4 border input-box"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Minimum Rating</h3>
        <input
          type="number"
          value={minCountAverage}
          onChange={(e) => setMinCountAverage(e.target.value)}
          placeholder="Rating (1-10)"
          min="1"
          max="10"
          className="w-full h-12 px-4 border input-box"
        />
      </div>

      <button 
        onClick={onSearch} 
        className="w-full h-12 font-semibold btn"
      >
        Apply
      </button>
    </aside>
  );
};

export default Filter;
