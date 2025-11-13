import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
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

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <Link to="/">Back to Recipes</Link>
      <h1>{recipe.title}</h1>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <FavoriteButton recipeId={recipe.id} />
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
