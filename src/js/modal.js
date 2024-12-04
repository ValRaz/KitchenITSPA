
// Creates and displays a modal with detailed recipe information (and a close button)
export function openModal(recipe) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h3>Ingredients</h3>
        <ul>
          ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.instructions || 'Instructions not available.'}</p>
        <h3>Nutrition</h3>
        <ul>
          ${recipe.nutrition ? 
            recipe.nutrition.nutrients.map(nutrient => 
              `<li>${nutrient.title}: ${nutrient.amount} ${nutrient.unit}</li>`).join('') 
            : 'Nutrition information not available.'}
        </ul>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    // Close button functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
      modal.remove();
    });
  }