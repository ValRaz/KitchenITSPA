import { openModal } from './modal.js';
import { loadFavorites } from './storage.js';
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';
import { fetchRecipeDetails } from './api.js';
import { showErrorMessage } from './alert.js';

// Displays the list of recipes from a search query
export function displayRecipes(recipes) {
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = recipes
    .map(recipe => {
      const isFav = isFavorite(recipe.id);
      return `
        <div class='recipe-card' data-id='${recipe.id}'>
          <h3>${recipe.title}</h3>
          <img src='${recipe.image}' alt='${recipe.title}'>
          <button class='view-details'>View Details</button>
          <button class='${isFav ? 'remove-favorite-button' : 'add-favorite-button'}'>
            ${isFav ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      `;
    })
    .join('');

  // Adds event listener for the "View Details" button
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', async (e) => {
      const recipeId = e.target.closest('.recipe-card').dataset.id;
      const recipe = await fetchRecipeDetails(recipeId);
      openModal(recipe);
    });
  });

  // Adds event listener for the "Add to Favorites" button
  document.querySelectorAll('.add-favorite-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const recipeId = e.target.closest('.recipe-card').dataset.id;
      addFavorite(recipeId);
      e.target.closest('.recipe-card').querySelector('.add-favorite-button').textContent = 'Remove from Favorites';
    });
  });

  // Adds event listener for the "Remove from Favorites" button
  document.querySelectorAll('.remove-favorite-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const recipeId = e.target.closest('.recipe-card').dataset.id;
      removeFavorite(recipeId);
      e.target.closest('.recipe-card').remove();
    });
  });
}

// Event listener for 'load' to display the View Favorites button after check
window.addEventListener('load', displayViewFavoritesButton);

// Displays the list of favorite recipe cards
export function displayFavorites() {
  const favorites = loadFavorites();
  const recipeList = document.getElementById('recipe-list');

  recipeList.innerHTML = '';

  if (favorites.length === 0) {
    showErrorMessage('No favorites added yet.');
    return;
  }

  // Displays favorite recipes
  recipeList.innerHTML = favorites
    .map(recipe => `
      <div class='recipe-card' data-id='${recipe.id}'>
        <h3>${recipe.title}</h3>
        <img src='${recipe.image}' alt='${recipe.title}'>
        <button class='view-details'>View Details</button>
        <button class='remove-favorite-button'>Remove from Favorites</button>
      </div>
    `)
    .join('');

  // Adds event listener for the "View Details" buttons
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', async (e) => {
      const recipeId = e.target.closest('.recipe-card').dataset.id;
      const recipe = await fetchRecipeDetails(recipeId);
      openModal(recipe);
    });
  });

  // Adds event listener for the "Remove from Favorites" button
  document.querySelectorAll('.remove-favorite-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const recipeId = e.target.closest('.recipe-card').dataset.id;
      removeFavorite(recipeId);
      e.target.closest('.recipe-card').remove();
    });
  });
}

// Adds the "View Favorites" button if favorites have been saved
export function displayViewFavoritesButton() {
  const favorites = loadFavorites(); 
  const viewFavoritesButton = document.getElementById('view-favorites-button');

  if (favorites.length > 0) {
    if (!viewFavoritesButton) {
      const button = document.createElement('button');
      button.id = 'view-favorites-button';
      button.textContent = 'View Favorites';
      button.addEventListener('click', displayFavorites);
      document.body.insertBefore(button, document.querySelector('main'));

      button.classList.add('view-favorites-button'); 
    }
  } else {
    if (viewFavoritesButton) {
      viewFavoritesButton.remove();
    }
  }
}

// Displays the correct button depending on favorite status
export function updateFavoriteButton(recipeId) {
  const recipeCard = document.querySelector(`.recipe-card[data-id='${recipeId}']`);
  const favoriteButton = recipeCard.querySelector('.favorite-button');

  if (isFavorite(recipeId)) {
    favoriteButton.textContent = 'Remove from Favorites';
  } else {
    favoriteButton.textContent = 'Add to Favorites';
  }

  // Adds event listener to toggle favorite status on click
  favoriteButton.addEventListener('click', () => {
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId); 
    } else {
      addFavorite(recipeId); 
    }
    updateFavoriteButton(recipeId); 
  });
}