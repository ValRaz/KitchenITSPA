import { saveToFavorites, loadFavorites, removeFromFavorites } from './storage.js';
import { fetchRecipeDetails } from './api.js';
import { displayViewFavoritesButton } from './dom.js';

// Adds a recipe to favorites
export async function addFavorite(recipeId) {
    try {
        const recipe = await fetchRecipeDetails(recipeId);
        saveToFavorites(recipe);
        displayViewFavoritesButton(); // Ensure the "View Favorites" button updates after adding
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

// Removes a recipe from favorites
export function removeFavorite(recipeId) {
    removeFromFavorites(recipeId);
    displayViewFavoritesButton(); // Ensure the "View Favorites" button updates after removal
}

// Checks if a recipe is in favorites
export function isFavorite(recipeId) {
    const favorites = loadFavorites();
    return favorites.some(favorite => favorite.id === recipeId);
}