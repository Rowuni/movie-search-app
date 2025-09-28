import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../services/movieService';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import './MovieList.css';

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, isLoading, error, hasSearched }) => {
  const navigate = useNavigate();

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <h3>Searching movies...</h3>
        <p>Please wait while we find the best results for you</p>
      </div>
    );
  }

  if (error) {
    // Personnaliser le message selon le type d'erreur
    const getErrorSuggestion = (errorMessage: string) => {
      const lowerError = errorMessage.toLowerCase();
      
      if (lowerError.includes('movie not found') || lowerError.includes('not found')) {
        return "Try using different keywords or check the movie title spelling.";
      } else if (lowerError.includes('api key') || lowerError.includes('unauthorized')) {
        return "There's an issue with the API configuration. Please contact support.";
      } else if (lowerError.includes('network') || lowerError.includes('fetch')) {
        return "Please check your internet connection and try again.";
      } else if (lowerError.includes('too many results')) {
        return "Try being more specific with your search terms.";
      } else {
        return "Please try again later or search for a different movie.";
      }
    };

    return (
      <div className="error">
        <div className="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <div className="error-suggestion">
          <p>{getErrorSuggestion(error)}</p>
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="welcome">
        <div className="welcome-icon">🎬</div>
        <h2>Welcome to Movie Search!</h2>
        <p>Start by searching for your favorite movies above...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No movies found</h3>
        <p>We couldn't find any movies matching your search.</p>
        <div className="no-results-suggestion">
          <p>Try different keywords or check the spelling of your search term.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <div className="movies-grid">
        {movies.map((movie) => (
          <div 
            key={movie.imdbID} 
            className="movie-card"
            onClick={() => handleMovieClick(movie.imdbID)}
          >
            <div className="movie-poster">
              <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.svg'} 
                alt={movie.Title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-movie.svg';
                }}
              />
              <FavoriteButton movie={movie} size="medium" />
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-year">{movie.Year}</p>
              <p className="movie-type">{movie.Type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;