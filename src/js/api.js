const API_KEY = import.meta.env.VITE_RECIPE_API_KEY;
const API_BASE_URL = 'https://api.spoonacular.com/recipes';

//Fetches recipes from Spoonacular based on query string.
export async function fetchRecipes(query) {
  const url = `${API_BASE_URL}/complexSearch?query=${query}&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    if (data.results.length === 0) {
      throw new Error('No recipes found');
    }

    return data.results; 
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

// Fetches detailed information about a specific recipe by its ID.
export async function fetchRecipeDetails(recipeId) {
  const url = `${API_BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
}