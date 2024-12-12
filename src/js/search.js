import { fetchRecipes } from './api.js';
import { displayRecipes } from './dom.js';
import { showErrorMessage, hideMessage, showSpinner } from './alert.js';

// Debounce function (prevents rapid API calls)
let debounceTimeout;

export async function handleSearch(query) {
  // Clears any existing error messages
  hideMessage();

  // Trims the query
  query = query.trim();

  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(async () => {
    if (query.length > 2) {
      try {
        // Show the spinner while loading
        showSpinner();

        const recipes = await fetchRecipes(query);

        // Hide the spinner once loading is complete
        hideMessage();

        if (recipes.length === 0) {
          // Displays no recipes found alert
          showErrorMessage('No recipes found.');
        } else {
          // Displays the recipes
          displayRecipes(recipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);

        // Hide the spinner before showing an error
        hideMessage();

        // Displays error message if there's an issue fetching data
        showErrorMessage('Error fetching recipes. Please try again later.');
      }
    } else {
      // Shows error message if the search query is too short
      showErrorMessage('Please enter a valid search term.');
    }
  }, 300); // Adjust debounce delay as needed
}