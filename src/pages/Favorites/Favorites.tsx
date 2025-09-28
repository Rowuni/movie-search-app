import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './Favorites.css';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="favorites-page">
      <header className="favorites-header">
        <div className="header-top">
          <ThemeToggle />
        </div>
        <button onClick={handleBackToHome} className="back-to-home-button">
          ← Back to Search
        </button>
        <h1>⭐ My Favorite Movies</h1>
        <p>You have {favorites.length} favorite movie{favorites.length !== 1 ? 's' : ''}</p>
      </header>
      
      <main className="favorites-main">
        {favorites.length === 0 ? (
          <div className="no-favorites">
            <div className="no-favorites-icon">⭐</div>
            <h2>No favorites yet!</h2>
            <p>Start adding movies to your favorites by clicking the star icon</p>
            <button onClick={handleBackToHome} className="explore-button">
              Explore Movies
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <div 
                key={movie.imdbID} 
                className="favorite-movie-card"
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
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;