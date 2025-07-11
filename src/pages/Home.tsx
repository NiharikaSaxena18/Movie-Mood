import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie';
import { getPopularMovies, searchMovies } from '../services/tmdbApi';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await getPopularMovies();
      setMovies(response.results);
      setSearchQuery('');
    } catch (error) {
      console.error('Error loading popular movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const response = await searchMovies(query);
      setMovies(response.results);
      setSearchQuery(query);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="home">
      <h1>MovieMood Recommender</h1>
      
      <div>
        <SearchBar onSearch={handleSearch} loading={loading} />
        <button 
          onClick={loadPopularMovies}
          style={{ 
            borderRadius: '4px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Home
        </button>
      </div>

      <h2>
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Movies'}
      </h2>
      
      <MovieList 
        movies={movies} 
        onMovieClick={handleMovieClick}
        loading={loading}
      />
    </div>
  );
};

export default Home;
