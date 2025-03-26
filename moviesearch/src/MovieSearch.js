import React, { useState } from "react";
import axios from "axios";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const searchMovies = async () => {
    try {
      const response = await axios.get(`https://movie-search-application-c7mt.onrender.com/api/search?query=${query}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };
  
  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(`https://movie-search-application-c7mt.onrender.com/api/movie?id=${id}`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };
  

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Movie Search App</h1>
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 mt-2 w-full" onClick={searchMovies}>Search</button>
      
      {movies.length > 0 && (
        <ul className="mt-4">
          {movies.map((movie) => (
            <li key={movie.imdbID} className="p-2 border-b cursor-pointer" onClick={() => getMovieDetails(movie.imdbID)}>
              <img src={movie.Poster} alt={movie.Title} className="w-16 inline-block mr-2" />
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      )}

      {selectedMovie && (
        <div className="mt-4 p-4 border">
          <h2 className="text-xl font-bold">{selectedMovie.Title}</h2>
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
