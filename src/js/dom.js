import { openModal } from './modal.js';
import { saveToFavorites, loadFavorites, removeFromFavorites } from './storage.js';
import { fetchRecipeDetails } from './api.js';

export function displayRecipes(recipes) {
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = recipes
    .map(recipe => `
      <div class="recipe-card" data-id="${recipe.id}">
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
        <button class="view-details">View Details</button>
        <button class="favorite-button">${isFavorite(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
      </div>
    `)
    .join('');

  // Add event listeners for the buttons
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', async (e) => {
      const recipeId = e.target.closest('.recipe-card').dataset.id;
      const recipe = await fetchRecipeDetails(recipeId);
      openModal(recipe);
    });
  });

  document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const recipeId = e.target.closest('.recipe-card').dataset.id;
      const recipe = recipes.find(r => r.id == recipeId);

      if (isFavorite(recipeId)) {
        removeFromFavorites(recipeId);
        e.target.textContent = 'Add to Favorites';
      } else {
        saveToFavorites(recipe);
        e.target.textContent = 'Remove from Favorites';
      }
    });
  });
}

// Check if a recipe is in favorites
function isFavorite(recipeId) {
  const favorites = loadFavorites();
  return favorites.some(favorite => favorite.id === recipeId);
}