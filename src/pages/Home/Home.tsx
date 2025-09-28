import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import Pagination from '../../components/Pagination/Pagination';

import { useSearch } from '../../contexts/SearchContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { searchState, setFilters, clearFilters, searchMovies: contextSearchMovies } = useSearch();
  const { movies, isLoading, error, hasSearched, currentPage, totalResults, totalPages, selectedYear, selectedType } = searchState;

  // Calculer les années disponibles à partir des films
  const availableYears = useMemo(() => {
    const years = movies.map(movie => movie.Year).filter((year, index, self) => self.indexOf(year) === index);
    return years.sort((a, b) => parseInt(b) - parseInt(a)); // Tri décroissant
  }, [movies]);

  // Filtrer les films selon les critères sélectionnés
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const yearMatch = selectedYear === '' || movie.Year === selectedYear;
      const typeMatch = selectedType === '' || movie.Type === selectedType;
      return yearMatch && typeMatch;
    });
  }, [movies, selectedYear, selectedType]);

  const handleSearch = async (query: string) => {
    await contextSearchMovies(query, 1);
  };

  const handleLoadMore = async () => {
    if (searchState.query && currentPage < totalPages) {
      await contextSearchMovies(searchState.query, currentPage + 1);
    }
  };

  const handlePageChange = async (page: number) => {
    if (searchState.query) {
      await contextSearchMovies(searchState.query, page);
    }
  };

  const handleYearChange = (year: string) => {
    setFilters(year, selectedType);
  };

  const handleTypeChange = (type: string) => {
    setFilters(selectedYear, type);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="header-top">
          <button 
            className="favorites-link"
            onClick={() => navigate('/favorites')}
            title="View your favorite movies"
          >
            ⭐ Favorites ({favorites.length})
          </button>
          <ThemeToggle />
        </div>
        <h1>Movie Search</h1>
        <p>Discover your favorite movies</p>
      </header>
      
      <main className="home-main">
        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          initialQuery={searchState.query}
        />
        
        {hasSearched && !isLoading && !error && (
          <FiltersBar
            selectedYear={selectedYear}
            selectedType={selectedType}
            onYearChange={handleYearChange}
            onTypeChange={handleTypeChange}
            onClearFilters={handleClearFilters}
            availableYears={availableYears}
          />
        )}
        
        <MovieList 
          movies={filteredMovies} 
          isLoading={isLoading} 
          error={error} 
          hasSearched={hasSearched}
        />
        
        {hasSearched && !isLoading && !error && filteredMovies.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={handlePageChange}
            onLoadMore={handleLoadMore}
            showLoadMore={true}
          />
        )}
      </main>
    </div>
  );
};

export default Home;