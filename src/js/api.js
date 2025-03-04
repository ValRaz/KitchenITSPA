import { API_KEY } from '../config';
const API_BASE_URL = 'https://api.spoonacular.com/recipes';

//Fetches recipes from Spoonacular based on query string.
export async function fetchRecipes(query) {
  const isIngredientSearch = query.includes(',');
  const url = isIngredientSearch
    ? `${API_BASE_URL}/findByIngredients?ingredients=${query}&apiKey=${API_KEY}`
    : `${API_BASE_URL}/complexSearch?query=${query}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length === 0) {
      throw new Error('No recipes found');
    }

    if (!Array.isArray(data.results) || data.results.length === 0) {
      throw new Error('No recipes found');
    }

    return isIngredientSearch ? data : data.results;
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