import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home/Home';
import MovieDetailsPage from './pages/MovieDetails/MovieDetails';
import FavoritesPage from './pages/Favorites/Favorites';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <SearchProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
              </Routes>
            </div>
          </Router>
        </SearchProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
