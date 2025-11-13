import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black Pepper'],
      instructions: 'Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all.',
      category: 'Italian'
    },
    {
      id: 2,
      title: 'Chicken Curry',
      ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Onion', 'Garlic'],
      instructions: 'Sauté onion and garlic. Add chicken and curry. Pour coconut milk. Simmer.',
      category: 'Indian'
    }
  ],
  searchTerm: '',
  filteredRecipes: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setRecipes: (newRecipes) => set({ recipes: newRecipes }),
  filterRecipes: () => set((state) => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(state.searchTerm.toLowerCase())) ||
      recipe.category.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),
  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, { ...recipe, id: Date.now() }]
  })),
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  getFilteredRecipes: () => {
    const { recipes, searchTerm } = get();
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase())) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
  favorites: [],
  recommendations: [],
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...state.favorites, recipeId]
  })),
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  generateRecommendations: () => set((state) => {
    // Simple recommendation based on favorite categories
    const favoriteRecipes = state.recipes.filter(recipe => state.favorites.includes(recipe.id));
    const favoriteCategories = [...new Set(favoriteRecipes.map(recipe => recipe.category))];
    const recommended = state.recipes.filter(recipe =>
      favoriteCategories.includes(recipe.category) && !state.favorites.includes(recipe.id)
    );
    return { recommendations: recommended.slice(0, 5) }; // Limit to 5 recommendations
  })
}));

export default useRecipeStore;
