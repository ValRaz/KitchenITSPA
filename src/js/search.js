import { fetchRecipes } from './api.js';
import { displayRecipes } from './dom.js';
import { showErrorMessage, hideMessage } from './alert.js';

export async function handleSearch(query) {
    // Clears any existing error messages
    hideMessage();
  
    if (query.length > 2) {
      try {
        const recipes = await fetchRecipes(query);
  
        if (recipes.length === 0) {
          // Displays no recipes found alert
          showErrorMessage('No recipes found.');
        } else {
          // Displays the recipes
          displayRecipes(recipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Displays error message if there's an issue fetching data
        showErrorMessage('Error fetching recipes. Please try again later.');
      }
    } else {
      // Shows error message if the search query is too short
      showErrorMessage('Please enter a valid search term.');
    }
  }