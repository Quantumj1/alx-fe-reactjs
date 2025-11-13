import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Recipe Sharing App</h1>
      <SearchBar />
      <RecipeList />
      <AddRecipeForm />
    </div>
  )
}

export default App
