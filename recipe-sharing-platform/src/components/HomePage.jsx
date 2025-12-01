import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json'; // place data.json next to the component

export default function HomePage() {
  const [recipes, setRecipes] = useState(() => {
    try {
      const raw = localStorage.getItem('recipes');
      return raw ? JSON.parse(raw) : recipeData;
    } catch {
      return recipeData;
    }
  });

  useEffect(() => {
    // Subscribe to storage changes from other tabs/windows
    const onStorage = () => {
      try {
        const raw = localStorage.getItem('recipes');
        if (raw) setRecipes(JSON.parse(raw));
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    // This effect could be used to fetch data from an API if needed
  }, []);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-6">
        <div className="flex justify-end mb-4">
          <Link
            to="/add-recipe"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add Recipe
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Recipe List</h2>
        {recipes.length === 0 ? (
          <p>Loading recipes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hover:scale-105 transition-transform sm:mt-10 md:mt-16 lg:mt-20">
            {recipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow sm:p-4 md:p-6 lg:p-8 cursor-pointer">
                  <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4">{recipe.summary}</p>
                  <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover rounded mb-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}