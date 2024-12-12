import { displayViewFavoritesButton } from './dom';

// Saves a recipe to local storage
export function saveToFavorites(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; 
    const recipeToSave = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        ingredients: recipe.usedIngredients,  
        missedIngredients: recipe.missedIngredients,
        likes: recipe.likes
    };

    const isAlreadyFavorite = favorites.some(fav => fav.id === recipe.id);

    if (!isAlreadyFavorite) {
        favorites.push(recipeToSave);
        localStorage.setItem('favorites', JSON.stringify(favorites)); 
        displayViewFavoritesButton();
    } else {
        console.log(`Recipe with id ${recipe.id} is already in favorites.`);
    }
}

// Loads the list of favorites from localStorage
export function loadFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || []; 
}

// Remove a recipe from favorites by ID
export function removeFromFavorites(recipeId) {
    console.log(localStorage.getItem('favorites'));
    console.log('Attempting to remove recipe with ID:', recipeId);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Favorites before removal:', favorites);

    // Remove the recipe from the favorites array by ensuring type consistency
    favorites = favorites.filter(recipe => recipe.id !== parseInt(recipeId, 10));

    console.log('Favorites after removal:', favorites);

    // Save the updated favorites array back to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Ensure the "View Favorites" button updates after removal
    displayViewFavoritesButton();
}