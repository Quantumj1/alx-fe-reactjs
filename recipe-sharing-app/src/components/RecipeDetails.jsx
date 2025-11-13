import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

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
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
