import React from 'react';

const Card = ({ title, genre, year, poster }) => {
  return (
    <div className="card">
      <div className="h-48 bg-neutral flex items-center justify-center">
        {poster ? (
          <img src={poster} alt={`${title} Poster`} className="h-full w-full object-cover" />
        ) : (
          <span className="text-black !important">Poster</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-neutral-darkest">Genre: {genre}</p>
        <p className="text-neutral-darkest">Year: {year}</p>
      </div>
    </div>
  );
};

export default Card;
