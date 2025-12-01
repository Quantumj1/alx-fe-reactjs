import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import recipeData from '../data.json';

export default function AddRecipeForm() {
  // ...existing code...

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationsteps, setpreparationsteps] = useState('');
  // New `steps` field (allows line-separated step entries)
  const [steps, setSteps] = useState('');
  const navigate = useNavigate();
    // initialize from localStorage if present, otherwise fallback to bundled data
    const [recipes, setRecipes] = useState(() => {
      try {
        const raw = localStorage.getItem('recipes');
        return raw ? JSON.parse(raw) : recipeData;
      } catch {
        return recipeData;
      }
    });

    const handleSubmit = (e) => {  
    e.preventDefault();
    const newRecipe = {
      id: recipes.length + 1,
        title,
        ingredients: ingredients.split(',').map(ing => ing.trim()),
  preparationsteps,
  // store steps as an array (one step per line)
  steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
        image: 'https://via.placeholder.com/400', // Placeholder image  
    summary: preparationsteps.substring(0, 100) + '...' // Simple summary
    };
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    // persist to localStorage so other pages can read the new recipe
    try {
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    } catch {
      // ignore storage errors
    }
    // navigate to the recipe detail route (App uses /recipe/:id)
    navigate(`/recipe/${newRecipe.id}`);
  };

  useEffect(() => {
    // This effect could be used to fetch data from an API if needed
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Recipe</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required    
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="ingredients">Ingredients (comma separated)</label>   
            <textarea
            type="textarea"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}    
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="preparationsteps">Preparation Steps</label>
          <textarea     
            id="instructions"
            value={preparationsteps}
            onChange={(e) => setpreparationsteps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
            ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="steps">Step-by-step Instructions (one per line)</label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            placeholder={`e.g. Preheat oven\nMix ingredients\nBake for 30 minutes`}
          ></textarea>
        </div>
        <button
          type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"      
        >
          Add Recipe
        </button>
        </form>
    </div>
  );
}