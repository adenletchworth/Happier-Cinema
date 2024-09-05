import React from 'react';

const Card = ({ title, genre, year, poster }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {poster ? (
          <img src={poster} alt={`${title} Poster`} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-500">Poster</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">Genre: {genre}</p>
        <p className="text-gray-600">Year: {year}</p>
      </div>
    </div>
  );
};

export default Card;
