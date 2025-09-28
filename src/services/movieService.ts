const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Genre: string;
  Runtime: string;
  Released: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailsResponse extends MovieDetails {
  Response: string;
  Error?: string;
}

class MovieService {
  private async fetchApi(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'API Error');
    }
    return data;
  }

  async searchMovies(title: string, page: number = 1): Promise<{ movies: Movie[], totalResults: number }> {
    if (!API_KEY) {
      throw new Error('API key is missing. Please add VITE_OMDB_API_KEY to your .env file');
    }
    
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}&page=${page}`;
    const data: SearchResponse = await this.fetchApi(url);
    return {
      movies: data.Search || [],
      totalResults: parseInt(data.totalResults || '0')
    };
  }

  async getMovieDetails(imdbID: string): Promise<MovieDetails> {
    if (!API_KEY) {
      throw new Error('API key is missing. Please add VITE_OMDB_API_KEY to your .env file');
    }
    
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`;
    const data: MovieDetailsResponse = await this.fetchApi(url);
    return data;
  }
}

export const movieService = new MovieService();