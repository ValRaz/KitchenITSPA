import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.RECIPE_API_KEY;
const API_BASE_URL = 'https://api.spoonacular.com/recipes';

//Fetches recipes from Spoonacular based on query string.
export async function fetchRecipes(query) {
  const url = `${API_BASE_URL}/complexSearch?query=${query}&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}