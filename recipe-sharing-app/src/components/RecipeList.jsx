import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.getFilteredRecipes());

  return (
    <div>
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
              <DeleteRecipeButton recipeId={recipe.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
