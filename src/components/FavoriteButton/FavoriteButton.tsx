import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { type Movie } from '../../services/movieService';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  movie, 
  size = 'medium',
  showText = false 
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.imdbID);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher la navigation vers les détails
    
    if (isMovieFavorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <button
      className={`favorite-button ${size} ${isMovieFavorite ? 'active' : ''}`}
      onClick={handleToggleFavorite}
      title={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="favorite-icon">
        {isMovieFavorite ? '⭐' : '☆'}
      </span>
      {showText && (
        <span className="favorite-text">
          {isMovieFavorite ? 'Remove' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;