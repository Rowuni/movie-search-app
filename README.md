# 🎬 Movie Search App

A modern movie search application built with React, TypeScript and the OMDB API.

## ✨ Features

### Core Features
- 🔍 **Movie Search**: Instant search via OMDB API
- 📄 **Movie Details**: Dedicated page with complete information
- ⭐ **Favorites System**: Add/remove with localStorage persistence
- 📱 **Responsive Design**: Mobile and desktop optimized interface

### Advanced Features
- 🎯 **Smart Filters**: By year and type (Movie/Series/Episode)
- 📊 **Pagination**: Page navigation + "Load More" button
- 🌓 **Dark/Light Theme**: Toggle with preference saving
- 🎨 **Modern Interface**: Animations, gradients, glassmorphism

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript
- **Build**: Vite 
- **Routing**: React Router v6
- **State Management**: React Context (useContext)
- **Styling**: Modern CSS with variables and animations
- **API**: OMDB API for movie data

## 🚀 Installation

1. **Clone the project**
```bash
git clone https://github.com/Rowuni/movie-search-app.git
cd movie-search-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure the API**
```bash
Replace API_KEY_HERE with your API key in the .env file
```
> You can get your API key here [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)

4. **Start the application**
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── FavoriteButton/  # Favorite button with animations
│   ├── FiltersBar/      # Filters by year/type
│   ├── MovieList/       # Movie grid with states
│   ├── Pagination/      # Page navigation
│   ├── SearchBar/       # Search bar
│   └── ThemeToggle/     # Theme toggle
├── contexts/            # Global state management
│   ├── FavoritesContext.tsx  # Favorites context
│   ├── SearchContext.tsx     # Search context
│   └── ThemeContext.tsx      # Theme context
├── pages/              # Main pages
│   ├── Home/           # Home page with search
│   ├── Favorites/      # Favorites page
│   └── MovieDetails/   # Movie details page
└── services/           # API services
    └── movieService.ts # OMDB API interface
```

## 🎯 Architecture

The application uses **React Context** for global state management:

- **FavoritesContext**: Favorites management with localStorage
- **SearchContext**: Search state, pagination and filters  
- **ThemeContext**: Dark/light theme with persistence

## 📱 Usage

1. **Search**: Enter a movie title in the search bar
2. **Filter**: Use filters by year and type
3. **Favorites**: Click the star to add/remove favorites
4. **Navigation**: Browse pages or use "Load More"
5. **Theme**: Switch between light and dark mode
6. **Details**: Click on a movie to see its complete details

## 🔧 Available Scripts

```bash
npm run dev      # Start in development mode
npm run build    # Build for production  
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
