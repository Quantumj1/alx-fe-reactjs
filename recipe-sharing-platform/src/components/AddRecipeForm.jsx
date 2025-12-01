import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import recipeData from '../data.json';

export default function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationsteps, setPreparationSteps] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState(() => {
    try {
      const raw = localStorage.getItem('recipes');
      return raw ? JSON.parse(raw) : recipeData;
    } catch {
      return recipeData;
    }
  });

  function validate({ title, ingredients, preparationsteps }) {
    const e = {};
    if (!title || title.trim().length < 3) e.title = 'Title must be at least 3 characters';
    if (!ingredients || ingredients.trim().length < 3) e.ingredients = 'Provide at least one ingredient';
    if (!preparationsteps || preparationsteps.trim().length < 10) e.preparationsteps = 'Please enter preparation steps (at least 10 chars)';
    return { valid: Object.keys(e).length === 0, errors: e };
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validate({ title, ingredients, preparationsteps });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      ingredients: ingredients.split(',').map(i => i.trim()).filter(Boolean),
      preparationsteps: preparationsteps.trim(),
      steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
      image: 'https://via.placeholder.com/400',
      summary: preparationsteps.substring(0, 100) + '...'
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    try {
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    } catch {
      // ignore
    }

    navigate(`/recipe/${newRecipe.id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Recipe</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="ingredients">Ingredients (comma separated)</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.ingredients && <p className="text-red-600 mt-1">{errors.ingredients}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="preparationsteps">Preparation Steps</label>
          <textarea
            id="preparationsteps"
            value={preparationsteps}
            onChange={(e) => setPreparationSteps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
          {errors.preparationsteps && <p className="text-red-600 mt-1">{errors.preparationsteps}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="steps">Step-by-step Instructions (one per line)</label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder={`e.g. Preheat oven\nMix ingredients\nBake for 30 minutes`}
          />
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