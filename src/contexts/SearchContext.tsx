import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type Movie, movieService } from '../services/movieService';

interface SearchState {
  movies: Movie[];
  query: string;
  hasSearched: boolean;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalResults: number;
  totalPages: number;
  selectedYear: string;
  selectedType: string;
}

interface SearchContextType {
  searchState: SearchState;
  updateSearchState: (state: Partial<SearchState>) => void;
  clearSearch: () => void;
  setFilters: (year: string, type: string) => void;
  clearFilters: () => void;
  loadMoreMovies: () => void;
  goToPage: (page: number) => void;
  searchMovies: (query: string, page?: number) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const initialState: SearchState = {
  movies: [],
  query: '',
  hasSearched: false,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalResults: 0,
  totalPages: 0,
  selectedYear: '',
  selectedType: '',
};

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchState, setSearchState] = useState<SearchState>(initialState);

  const updateSearchState = (newState: Partial<SearchState>) => {
    setSearchState(prev => ({ ...prev, ...newState }));
  };

  const clearSearch = () => {
    setSearchState(initialState);
  };

  const setFilters = (year: string, type: string) => {
    setSearchState(prev => ({ 
      ...prev, 
      selectedYear: year, 
      selectedType: type,
      currentPage: 1 
    }));
  };

  const clearFilters = () => {
    setSearchState(prev => ({ 
      ...prev, 
      selectedYear: '', 
      selectedType: '',
      currentPage: 1 
    }));
  };

  const loadMoreMovies = () => {
    setSearchState(prev => ({ 
      ...prev, 
      currentPage: prev.currentPage + 1 
    }));
  };

  const goToPage = (page: number) => {
    setSearchState(prev => ({ 
      ...prev, 
      currentPage: page 
    }));
  };

  const searchMovies = async (query: string, page: number = 1) => {
    try {
      setSearchState(prev => ({ 
        ...prev, 
        isLoading: true, 
        error: null, 
        hasSearched: true, 
        query,
        currentPage: page
      }));
      
      const { movies, totalResults } = await movieService.searchMovies(query, page);
      const totalPages = Math.ceil(totalResults / 10); // OMDB returns 10 results per page
      
      if (page === 1) {
        // New search - replace movies
        setSearchState(prev => ({ 
          ...prev, 
          movies, 
          isLoading: false,
          totalResults,
          totalPages
        }));
      } else {
        // Load more - append movies
        setSearchState(prev => ({ 
          ...prev, 
          movies: [...prev.movies, ...movies], 
          isLoading: false,
          totalResults,
          totalPages
        }));
      }
    } catch (err) {
      setSearchState(prev => ({ 
        ...prev, 
        error: err instanceof Error ? err.message : 'An error occurred while searching',
        movies: page === 1 ? [] : prev.movies,
        isLoading: false,
        totalResults: page === 1 ? 0 : prev.totalResults,
        totalPages: page === 1 ? 0 : prev.totalPages
      }));
    }
  };

  return (
    <SearchContext.Provider value={{ 
      searchState, 
      updateSearchState, 
      clearSearch,
      setFilters,
      clearFilters,
      loadMoreMovies,
      goToPage,
      searchMovies
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};