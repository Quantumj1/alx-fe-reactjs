import { useParams } from 'react-router-dom';
import recipeData from '../data.json';
import React, { useEffect } from 'react';

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipeData.find(r => r.id === parseInt(id));

useEffect(() => {
    // This effect could be used to fetch data from an API if needed
  }, []);

  if (!recipe) {
    return <div className="flex items-center justify-center min-h-screen">Recipe not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-gray-600 mb-6">{recipe.summary}</p>
        
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside mb-6">
          {recipe.ingredients.map((ing, index) => (
            <li key={index} className="text-gray-700">{ing}</li>
          ))}
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Cooking Instructions</h2>
        <p className="text-gray-700">{recipe.instructions}</p>
      </div>
    </div>
  );
}
