(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const l="dc4e5fd9da0e41ada9069b06ccd22c83",d="https://api.spoonacular.com/recipes";async function u(t){const e=t.split(",").map(n=>n.trim()).join(","),r=`${d}/findByIngredients?ingredients=${e}&number=10&ranking=1&ignorePantry=true&apiKey=${l}`;try{const n=await fetch(r);if(!n.ok)throw new Error("Network response was not ok");const o=await n.json();if(o.results.length===0)throw new Error("No recipes found");return o.results}catch(n){throw console.error("Error fetching recipes:",n),n}}async function f(t){const e=`${d}/${t}/information?apiKey=${l}`;try{const r=await fetch(e);if(!r.ok)throw new Error("Network response was not ok");return await r.json()}catch(r){throw console.error("Error fetching recipe details:",r),r}}function m(t){const e=document.createElement("div");e.classList.add("modal"),e.innerHTML=`
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>${t.title}</h2>
        <img src="${t.image}" alt="${t.title}" />
        <h3>Ingredients</h3>
        <ul>
          ${t.extendedIngredients.map(r=>`<li>${r.name}</li>`).join("")}
        </ul>
        <h3>Instructions</h3>
        <p>${t.instructions||"Instructions not available."}</p>
        <h3>Nutrition</h3>
        <ul>
          ${t.nutrition?t.nutrition.nutrients.map(r=>`<li>${r.title}: ${r.amount} ${r.unit}</li>`).join(""):"Nutrition information not available."}
        </ul>
      </div>
    `,document.body.appendChild(e),e.querySelector(".close-btn").addEventListener("click",()=>{e.remove()})}function p(t){let e=JSON.parse(localStorage.getItem("favorites"))||[];e.push(t),localStorage.setItem("favorites",JSON.stringify(e))}function g(){return JSON.parse(localStorage.getItem("favorites"))||[]}function h(t){let e=JSON.parse(localStorage.getItem("favorites"))||[];e=e.filter(r=>r.id!==t),localStorage.setItem("favorites",JSON.stringify(e))}function y(t){const e=document.getElementById("recipe-list");e.innerHTML=t.map(r=>`
      <div class="recipe-card" data-id="${r.id}">
        <h3>${r.title}</h3>
        <img src="${r.image}" alt="${r.title}">
        <button class="view-details">View Details</button>
        <button class="favorite-button">${c(r.id)?"Remove from Favorites":"Add to Favorites"}</button>
      </div>
    `).join(""),document.querySelectorAll(".view-details").forEach(r=>{r.addEventListener("click",async n=>{const o=n.target.closest(".recipe-card").dataset.id,i=await f(o);m(i)})}),document.querySelectorAll(".favorite-button").forEach(r=>{r.addEventListener("click",n=>{const o=n.target.closest(".recipe-card").dataset.id,i=t.find(s=>s.id==o);c(o)?(h(o),n.target.textContent="Add to Favorites"):(p(i),n.target.textContent="Remove from Favorites")})})}function c(t){return g().some(r=>r.id===t)}function v(){const t=document.getElementById("error-message-container");if(t)return t;const e=document.createElement("div");return e.id="error-message-container",e.style.display="none",e.style.padding="20px",e.style.margin="20px",e.style.border="2px solid #f44336",e.style.backgroundColor="#f8d7da",e.style.color="#721c24",e.style.borderRadius="5px",e.style.textAlign="center",document.body.prepend(e),e}function a(t){const e=v();e.innerHTML=`<p>${t}</p>`,e.style.display="block"}function w(){const t=document.getElementById("error-message-container");t&&(t.style.display="none")}async function E(t){if(w(),t.length>2)try{const e=await u(t);e.length===0?a("No recipes found."):y(e)}catch(e){console.error("Error fetching recipes:",e),a("Error fetching recipes. Please try again later.")}else a("Please enter a valid search term.")}const b=document.getElementById("search-bar");b.addEventListener("input",t=>{const e=t.target.value.trim();E(e)});
