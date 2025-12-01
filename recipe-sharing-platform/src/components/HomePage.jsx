import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json'; // place data.json next to the component

export default function HomePage() {
  const [recipes] = useState(recipeData);

  useEffect(() => {
    // This effect could be used to fetch data from an API if needed
  }, []);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-6">
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