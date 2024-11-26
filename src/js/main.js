import { fetchRecipes } from './api.js';
import { showErrorMessage, hideMessage } from './alert.js';

const searchBar = document.getElementById('search-bar');
const recipeList = document.getElementById('recipe-list');

//Listener for the recipe search bar, and provided search query length is longer than two characters, fetches recipes from Spoonacular. 
searchBar.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    try {
      const recipes = await fetchRecipes(query);
      hideMessage(); // Hide any previous error messages
      displayRecipes(recipes);
    } catch (error) {
      if (error.message === 'No recipes found') {
        showErrorMessage('No recipes found for your search. Please try again.');
      } else {
        showErrorMessage('There was an error fetching the recipes. Please try again later.');
      }
    }
  } else {
    hideMessage(); // Hide error message when the input is less than 3 characters
  }
});

//Displays the recipes fetched to the DOM in a list.
function displayRecipes(recipes) {
  recipeList.innerHTML = recipes
    .map(recipe => `
      <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
      </div>
    `)
    .join('');
}
