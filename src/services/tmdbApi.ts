import axios from 'axios';
import type { Movie, MovieDetails, TMDBResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

if (!API_KEY) {
  throw new Error('TMDB API key is not defined.');
}

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbApi.get('/movie/popular');
  return response.data;
};

export const searchMovies = async (query: string): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbApi.get('/search/movie', { params: { query } });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await tmdbApi.get(`/movie/${id}`);
  return response.data;
};

export const getRecommendations = async (id: number): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbApi.get(`/movie/${id}/recommendations`);
  return response.data;
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};