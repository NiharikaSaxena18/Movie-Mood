import React from 'react';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  loading?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick, loading = false }) => {
  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (movies.length === 0) {
    return <div className="no-movies">No movies found.</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieList;