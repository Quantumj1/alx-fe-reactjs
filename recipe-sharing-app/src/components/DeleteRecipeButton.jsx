import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      filterRecipes(); // Update filtered recipes after deleting
      navigate('/');
    }
  };

  return (
    <button onClick={handleDelete}>Delete Recipe</button>
  );
};

export default DeleteRecipeButton;
