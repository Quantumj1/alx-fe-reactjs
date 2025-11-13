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
  setSearchTerm: (term) => set({ searchTerm: term }),
  setRecipes: (newRecipes) => set({ recipes: newRecipes }),
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
  }
}));

export default useRecipeStore;
