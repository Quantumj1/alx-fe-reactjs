import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import recipeData from '../data.json';

export default function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();
    const [recipes, setRecipes] = useState(recipeData);

    const handleSubmit = (e) => {  
    e.preventDefault();
    const newRecipe = {
      id: recipes.length + 1,
        title,
        ingredients: ingredients.split(',').map(ing => ing.trim()),
        instructions,
        image: 'https://via.placeholder.com/400', // Placeholder image  
    summary: instructions.substring(0, 100) + '...' // Simple summary
    };
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes); 
    // In a real app, you would also send this data to a backend server
    navigate(`/recipes/${newRecipe.id}`);
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
          <label className="block text-gray-700 mb-2" htmlFor="instructions">Instructions</label>
          <textarea     
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
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