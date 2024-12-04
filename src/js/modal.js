
//Creates and displays a modal with detailed recipe information (and a close button)
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
          ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
        <h3>Nutrition</h3>
        <p>${recipe.nutrition}</p>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    // Close button functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
      modal.remove();
    });
  }