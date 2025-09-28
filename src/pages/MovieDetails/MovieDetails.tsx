import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService, type MovieDetails } from '../../services/movieService';
import { useSearch } from '../../contexts/SearchContext';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import './MovieDetails.css';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { searchState } = useSearch();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        setError('Movie ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const movieData = await movieService.getMovieDetails(id);
        setMovie(movieData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBack = () => {
    // Navigate back to home with preserved search state
    navigate('/');
  };

  if (loading) {
    return <div className="movie-details-loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="movie-details-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={handleBack} className="back-button">
          Back to Search
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-error">
        <h2>Movie not found</h2>
        <button onClick={handleBack} className="back-button">
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <div className="movie-details-container">
        <button onClick={handleBack} className="back-button">
          ← Back
        </button>
        
        <div className="movie-details-content">
          <div className="movie-poster-large">
            <img 
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.svg'} 
              alt={movie.Title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-movie.svg';
              }}
            />
          </div>
          
            <div className="movie-info-detailed">
            <div className="title-and-favorite">
              <h1 className="movie-title-large">{movie.Title}</h1>
              <FavoriteButton 
                movie={{
                  imdbID: movie.imdbID,
                  Title: movie.Title,
                  Year: movie.Year,
                  Type: movie.Type,
                  Poster: movie.Poster
                }}
                size="large" 
                showText={true} 
              />
            </div>
            
            <div className="movie-meta">
              <span className="movie-year-large">{movie.Year}</span>
              <span className="movie-rating">⭐ {movie.imdbRating}/10</span>
              <span className="movie-runtime">{movie.Runtime}</span>
            </div>            <div className="movie-genres">
              {movie.Genre && movie.Genre.split(', ').map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>
            
            <div className="movie-plot">
              <h3>Synopsis</h3>
              <p>{movie.Plot !== 'N/A' ? movie.Plot : 'No synopsis available.'}</p>
            </div>
            
            <div className="movie-details-info">
              <div className="info-row">
                <strong>Director:</strong> {movie.Director !== 'N/A' ? movie.Director : 'Unknown'}
              </div>
              <div className="info-row">
                <strong>Actors:</strong> {movie.Actors !== 'N/A' ? movie.Actors : 'Unknown'}
              </div>
              <div className="info-row">
                <strong>Released:</strong> {movie.Released !== 'N/A' ? movie.Released : 'Unknown'}
              </div>
              <div className="info-row">
                <strong>Type:</strong> {movie.Type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;