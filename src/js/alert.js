// Checks for a message container then creates one if it doesn't exist.
function createMessageContainer() {
  const existingContainer = document.getElementById('error-message-container');

  if (existingContainer) {
    return existingContainer;
  }

  const messageContainer = document.createElement('div');
  messageContainer.id = 'error-message-container';
  messageContainer.style.display = 'none'; 
  messageContainer.style.padding = '20px';
  messageContainer.style.margin = '20px';
  messageContainer.style.border = `2px solid ${'#fcca8d'}`;
  messageContainer.style.backgroundColor = '#F5F5F5';
  messageContainer.style.color = '#333333';
  messageContainer.style.borderRadius = '5px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.position = 'fixed';
  messageContainer.style.top = '10px';
  messageContainer.style.left = '50%';
  messageContainer.style.transform = 'translateX(-50%)';
  messageContainer.style.zIndex = '1000';
  document.body.prepend(messageContainer); 
  return messageContainer;
}

// Function to show the error message
//Manages Temprary messages
let messageTimeout;

export function showErrorMessage(message, isTemporary = false) {
  const messageContainer = createMessageContainer();

  // Clears any existing timeout
  if (messageTimeout) {
    clearTimeout(messageTimeout);
    messageTimeout = null;
  }

  messageContainer.innerHTML = `<p>${message}</p>`;
  messageContainer.style.display = 'block';

  // Automatically hide message if it's temporary
  if (isTemporary) {
    messageTimeout = setTimeout(() => {
      hideMessage();
    }, 3000); 
  }
}

// Function to show a spinner (loading indicator)
export function showSpinner() {
  const messageContainer = createMessageContainer();

  messageContainer.innerHTML = `
    <div class="spinner"></div>
    <p>Loading...</p>
  `;
  messageContainer.style.display = 'block';
}

// Function to hide the error message
export function hideMessage() {
  const messageContainer = document.getElementById('error-message-container');
  if (messageContainer) {
    messageContainer.style.display = 'none'; 
    messageContainer.innerHTML = '';
  }
}