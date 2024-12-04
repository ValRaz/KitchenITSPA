import { handleSearch } from './search.js';

// Search bar listener
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  handleSearch(query);
});
