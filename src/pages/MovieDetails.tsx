import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { MovieDetails as MovieDetailsType, Movie } from '../types/movie';
import { getMovieDetails, getRecommendations, getImageUrl } from '../services/tmdbApi';
import MovieList from '../components/MovieList';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMovieDetails(parseInt(id));
    }
  }, [id]);

  const loadMovieDetails = async (movieId: number) => {
    try {
      setLoading(true);
      const [movieResponse, recommendationsResponse] = await Promise.all([
        getMovieDetails(movieId),
        getRecommendations(movieId)
      ]);
      
      setMovie(movieResponse);
      setRecommendations(recommendationsResponse.results);
    } catch (error) {
      console.error('Error loading movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found.</div>;
  }

  return (
    <div className="movie-details">
      <button 
        onClick={handleBackClick}
        style={{ 
          marginBottom: '20px',
          borderRadius: '4px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ← Back to Home
      </button>

      <div className="movie-header" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <img 
          src={getImageUrl(movie.poster_path, 'w300')} 
          alt={movie.title}
          style={{ width: '300px', height: '450px', objectFit: 'cover' }}
        />
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          {movie.tagline && <p><em>"{movie.tagline}"</em></p>}
          <p><strong>Overview:</strong></p>
          <p>{movie.overview}</p>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>Recommended Movies</h2>
          <MovieList 
            movies={recommendations} 
            onMovieClick={handleRecommendationClick}
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;