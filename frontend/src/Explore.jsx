import React, { useState } from 'react';
import Filter from './Filter';
import Card from './Card';
import SearchBar from './SearchBar';

const Explore = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [minVoteAverage, setMinVoteAverage] = useState('');
  const [afterYear, setAfterYear] = useState('');
  const [beforeYear, setBeforeYear] = useState('');

  const handleSearch = async () => {
    let params = {};
    if (query) params.query = query;
    if (genre) params.genre = genre;
    if (minVoteAverage) params.min_vote_average = minVoteAverage;
    if (afterYear) params.after_year = afterYear;
    if (beforeYear) params.before_year = beforeYear;
  
    const queryString = new URLSearchParams(params).toString();
  
    try {
      const response = await fetch(`http://localhost:8000/search?${queryString}`);
      const data = await response.json();
      console.log('API Response:', data); 
      setMovies(data.results); 
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };  

  const parseMovie = (movieString) => {
    const match = movieString.match(/^(.*)\s\((\d{4})\)\s-\s(.*)$/);
    if (match) {
      const [, title, year, genre] = match;
      return { title, year, genre };
    }
    return { title: movieString, year: '', genre: '' }; 
  };

  return (
    <main className="flex-1 max-w-full mx-64 px-4 py-6">
      <SearchBar className='w-full' query={query} setQuery={setQuery} onSearch={handleSearch} />
      <div className="flex flex-col md:flex-row md:space-x-4 mt-6">
        <Filter
          genre={genre}
          setGenre={setGenre}
          minVoteAverage={minVoteAverage}
          setMinVoteAverage={setMinVoteAverage}
          afterYear={afterYear}
          setAfterYear={setAfterYear}
          beforeYear={beforeYear}
          setBeforeYear={setBeforeYear}
          onSearch={handleSearch}
        />
        <section className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.length > 0 ? (
              movies.map((movie, index) => {
                const parsedMovie = parseMovie(movie);
                return (
                  <Card
                    key={index}
                    title={parsedMovie.title}
                    genre={parsedMovie.genre}
                    year={parsedMovie.year}
                    poster={null}
                  />
                );
              })
            ) : (
              <p>No movies found</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Explore;
