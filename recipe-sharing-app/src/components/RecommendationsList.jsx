import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  // Generate recommendations on component mount or when favorites change
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div>
      <h2>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>Add some favorites to get personalized recommendations.</p>
      ) : (
        <ul>
          {recommendations.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p><strong>Category:</strong> {recipe.category}</p>
              <Link to={`/recipe/${recipe.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationsList;
