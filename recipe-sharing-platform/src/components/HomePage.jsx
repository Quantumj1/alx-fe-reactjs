import React, { useState } from 'react';
import recipeData from './data.json'; // place data.json next to the component

export default function RecipeList() {
  const [recipes] = useState(recipeData);

  // No effect needed — data is available synchronously from the imported JSON

    return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>Loading recipes...</p>
      ) : (
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe.id} className="recipe-item">
                    <h3>{recipe.title}</h3>
                    <p>{recipe.summary}</p>
                    <p>{recipe.image}</p>
                </li>
            ))}
        </ul>
      )}
    </div>
  );
}