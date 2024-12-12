
// Creates and displays the modal with detailed recipe information (and a close button)
export function openModal(recipe) {
  // Creates a background overlay
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  
  // Creates the modal content
  const modal = document.createElement('div');
  modal.classList.add('modal');
  
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" aria-label="Close modal">&times;</span>
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

  // Appends the modal and overlays it to the body
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Focuses the modal for accessibility
  modal.setAttribute('tabindex', '-1');
  modal.focus();

  // Close button functionality
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    closeModal(modal, overlay);
  });

  // Closes modal if the background is clicked
  overlay.addEventListener('click', () => {
    closeModal(modal, overlay);
  });
}

// Function to close the modal and remove the overlay
function closeModal(modal, overlay) {
  modal.remove();
  overlay.remove();
}