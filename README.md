# 🎬 Movie Search App

Une application moderne de recherche de films construite avec React, TypeScript et l'API OMDB.

## ✨ Fonctionnalités

### Core Features
- 🔍 **Recherche de films** : Recherche instantanée via l'API OMDB
- 📄 **Détails des films** : Page dédiée avec informations complètes
- ⭐ **Système de favoris** : Ajout/suppression avec persistance localStorage
- 📱 **Design responsive** : Interface adaptée mobile et desktop

### Fonctionnalités Avancées
- 🎯 **Filtres intelligents** : Par année et type (Film/Série/Épisode)
- 📊 **Pagination** : Navigation par pages + bouton "Load More"
- 🌓 **Thème Dark/Light** : Basculement avec sauvegarde des préférences
- 🎨 **Interface moderne** : Animations, gradients, glassmorphism

## 🛠️ Technologies

- **Frontend** : React 18 + TypeScript
- **Build** : Vite 
- **Routing** : React Router v6
- **State Management** : React Context (useContext)
- **Styling** : CSS moderne avec variables et animations
- **API** : OMDB API pour les données de films

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd movie-search-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'API**
```bash
# Créer un fichier .env à la racine
echo "VITE_OMDB_API_KEY=your_api_key_here" > .env
```
> Obtenir une clé API gratuite sur [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)

4. **Démarrer l'application**
```bash
npm run dev
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── FavoriteButton/  # Bouton favoris avec animations
│   ├── FiltersBar/      # Filtres par année/type
│   ├── MovieList/       # Grille de films avec états
│   ├── Pagination/      # Navigation des pages
│   ├── SearchBar/       # Barre de recherche
│   └── ThemeToggle/     # Basculeur de thème
├── contexts/            # Gestion d'état globale
│   ├── FavoritesContext.tsx  # Contexte des favoris
│   ├── SearchContext.tsx     # Contexte de recherche
│   └── ThemeContext.tsx      # Contexte du thème
├── pages/              # Pages principales
│   ├── Home/           # Page d'accueil avec recherche
│   ├── Favorites/      # Page des favoris
│   └── MovieDetails/   # Page de détails d'un film
└── services/           # Services API
    └── movieService.ts # Interface avec OMDB API
```

## 🎯 Architecture

L'application utilise **React Context** pour la gestion d'état globale :

- **FavoritesContext** : Gestion des favoris avec localStorage
- **SearchContext** : État de recherche, pagination et filtres  
- **ThemeContext** : Thème sombre/clair avec persistance

## 📱 Utilisation

1. **Rechercher** : Saisir un titre de film dans la barre de recherche
2. **Filtrer** : Utiliser les filtres par année et type
3. **Favoris** : Cliquer sur l'étoile pour ajouter/supprimer des favoris
4. **Navigation** : Parcourir les pages ou utiliser "Load More"
5. **Thème** : Basculer entre mode clair et sombre
6. **Détails** : Cliquer sur un film pour voir ses détails complets

## 🔧 Scripts Disponibles

```bash
npm run dev      # Démarrer en mode développement
npm run build    # Construire pour la production  
npm run preview  # Prévisualiser le build de production
npm run lint     # Lancer ESLint
```
