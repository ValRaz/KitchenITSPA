// Saves a recipe to local storage under the 'favorites' key.
export function saveToFavorites(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Retrieves the list of favorite recipes from local storage.
export function loadFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Removes a recipe from local storage by its ID.
export function removeFromFavorites(recipeId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}