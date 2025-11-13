import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <ul>
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p><strong>Category:</strong> {recipe.category}</p>
              <Link to={`/recipe/${recipe.id}`}>View Details</Link>
              <button onClick={() => removeFavorite(recipe.id)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
