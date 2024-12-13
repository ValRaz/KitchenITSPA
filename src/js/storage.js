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
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites = favorites.filter(recipe => recipe.id !== parseInt(recipeId, 10));

    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    displayViewFavoritesButton();
}