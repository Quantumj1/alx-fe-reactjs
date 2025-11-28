import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import useRecipeStore from './components/recipeStore';
import './index.css'

function App() {
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Initialize filtered recipes on app load
  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  return (
    <Router>
      <div className="App">
        <h1>Recipe Sharing App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">My Favorites</Link>
        </nav>
        <SearchBar />
        <Routes>
          <Route path="/" element={
            <>
              <RecipeList />
              <AddRecipeForm />
              <RecommendationsList />
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
