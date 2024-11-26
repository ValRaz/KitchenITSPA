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
    messageContainer.style.border = '2px solid #f44336'; 
    messageContainer.style.backgroundColor = '#f8d7da'; 
    messageContainer.style.color = '#721c24'; 
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.textAlign = 'center';
    document.body.prepend(messageContainer); 
    return messageContainer;
  }
  
  // Function to show the error message
  export function showErrorMessage(message) {
    const messageContainer = createMessageContainer(); 
    messageContainer.innerHTML = `<p>${message}</p>`; 
    messageContainer.style.display = 'block'; 
  }
  
  // Function to hide the error message
  export function hideMessage() {
    const messageContainer = document.getElementById('error-message-container');
    if (messageContainer) {
      messageContainer.style.display = 'none'; 
    }
  }