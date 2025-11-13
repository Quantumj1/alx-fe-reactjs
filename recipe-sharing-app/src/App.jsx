import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import useRecipeStore from './components/recipeStore';
import './App.css'

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
        <SearchBar />
        <Routes>
          <Route path="/" element={
            <>
              <RecipeList />
              <AddRecipeForm />
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
