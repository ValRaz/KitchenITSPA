import { fetchRecipes } from './api.js';

const searchBar = document.getElementById('search-bar');
const recipeList = document.getElementById('recipe-list');

//Listener for the recipe search bar, and provided search query length is longer than two characters, fetches recipes from Spoonacular. 
searchBar.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    const recipes = await fetchRecipes(query);
    displayRecipes(recipes);
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
