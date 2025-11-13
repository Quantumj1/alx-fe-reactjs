import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
