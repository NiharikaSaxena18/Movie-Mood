import React from 'react';
import type { Movie } from '../types/movie';
import { getImageUrl } from '../services/tmdbApi';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      className="movie-card" 
      onClick={() => onClick(movie)}
      style={{ cursor: 'pointer' }}
    >
      <img 
        src={getImageUrl(movie.poster_path)} 
        alt={movie.title}
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>Release: {movie.release_date}</p>
        <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
        <p className="overview">{movie.overview.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

export default MovieCard;