import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const isFavorite = favorites.includes(recipeId);

  return (
    <button onClick={() => isFavorite ? removeFavorite(recipeId) : addFavorite(recipeId)}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div class='recipe-list mb-6 '>
      <h2>Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p><strong>Category:</strong> {recipe.category}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <Link to={`/recipe/${recipe.id}`}>View Details</Link>
              <FavoriteButton recipeId={recipe.id} />
              <DeleteRecipeButton recipeId={recipe.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
