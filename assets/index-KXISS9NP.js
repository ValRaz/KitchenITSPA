(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const f="dc4e5fd9da0e41ada9069b06ccd22c83",m="https://api.spoonacular.com/recipes";async function w(t){const e=t.includes(","),o=e?`${m}/findByIngredients?ingredients=${t}&apiKey=${f}`:`${m}/complexSearch?query=${t}&apiKey=${f}`;try{const i=await fetch(o);if(!i.ok)throw new Error("Network response was not ok");const r=await i.json();if(Array.isArray(r)&&r.length===0)throw new Error("No recipes found");if(!Array.isArray(r.results)||r.results.length===0)throw new Error("No recipes found");return e?r:r.results}catch(i){throw console.error("Error fetching recipes:",i),i}}async function v(t){const e=`${m}/${t}/information?apiKey=${f}`;try{const o=await fetch(e);if(!o.ok)throw new Error("Network response was not ok");return await o.json()}catch(o){throw console.error("Error fetching recipe details:",o),o}}function y(t){const e=document.createElement("div");e.classList.add("modal-overlay");const o=document.createElement("div");o.classList.add("modal"),o.innerHTML=`
    <div class="modal-content">
      <span class="close-btn" aria-label="Close modal">&times;</span>
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
  `,document.body.appendChild(e),document.body.appendChild(o),o.setAttribute("tabindex","-1"),o.focus(),o.querySelector(".close-btn").addEventListener("click",()=>{g(o,e)}),e.addEventListener("click",()=>{g(o,e)})}function g(t,e){t.remove(),e.remove()}function E(t){let e=JSON.parse(localStorage.getItem("favorites"))||[];const o={id:t.id,title:t.title,image:t.image,ingredients:t.usedIngredients,missedIngredients:t.missedIngredients,likes:t.likes};e.some(r=>r.id===t.id)?console.log(`Recipe with id ${t.id} is already in favorites.`):(e.push(o),localStorage.setItem("favorites",JSON.stringify(e)),s())}function p(){return JSON.parse(localStorage.getItem("favorites"))||[]}function $(t){let e=JSON.parse(localStorage.getItem("favorites"))||[];e=e.filter(o=>o.id!==parseInt(t,10)),localStorage.setItem("favorites",JSON.stringify(e)),s()}async function I(t){try{const e=await v(t);E(e),s()}catch(e){console.error("Error fetching recipe details:",e)}}function h(t){$(t),s()}function L(t){return p().some(o=>o.id===t)}function b(){const t=document.getElementById("error-message-container");if(t)return t;const e=document.createElement("div");return e.id="error-message-container",e.style.display="none",e.style.padding="20px",e.style.margin="20px",e.style.border="2px solid #fcca8d",e.style.backgroundColor="#F5F5F5",e.style.color="#333333",e.style.borderRadius="5px",e.style.textAlign="center",e.style.position="fixed",e.style.top="10px",e.style.left="50%",e.style.transform="translateX(-50%)",e.style.zIndex="1000",document.body.prepend(e),e}let a;function c(t,e=!1){const o=b();a&&(clearTimeout(a),a=null),o.innerHTML=`<p>${t}</p>`,o.style.display="block",e&&(a=setTimeout(()=>{l()},3e3))}function S(){const t=b();t.innerHTML=`
    <div class="spinner"></div>
    <p>Loading...</p>
  `,t.style.display="block"}function l(){const t=document.getElementById("error-message-container");t&&(t.style.display="none",t.innerHTML="")}function F(t){const e=document.getElementById("recipe-list");e.innerHTML=t.map(o=>{const i=L(o.id);return`
        <div class='recipe-card' data-id='${o.id}'>
          <h3>${o.title}</h3>
          <img src='${o.image}' alt='${o.title}'>
          <button class='view-details'>View Details</button>
          <button class='${i?"remove-favorite-button":"add-favorite-button"}'>
            ${i?"Remove from Favorites":"Add to Favorites"}
          </button>
        </div>
      `}).join(""),document.querySelectorAll(".view-details").forEach(o=>{o.addEventListener("click",async i=>{const r=i.target.closest(".recipe-card").dataset.id,n=await v(r);y(n)})}),document.querySelectorAll(".add-favorite-button").forEach(o=>{o.addEventListener("click",i=>{const r=i.target.closest(".recipe-card").dataset.id;I(r),i.target.closest(".recipe-card").querySelector(".add-favorite-button").textContent="Remove from Favorites"})}),document.querySelectorAll(".remove-favorite-button").forEach(o=>{o.addEventListener("click",i=>{const r=i.target.closest(".recipe-card").dataset.id;h(r),i.target.closest(".recipe-card").remove()})})}window.addEventListener("load",s);function A(){const t=p(),e=document.getElementById("recipe-list");if(e.innerHTML="",t.length===0){c("No favorites added yet.");return}e.innerHTML=t.map(o=>`
      <div class='recipe-card' data-id='${o.id}'>
        <h3>${o.title}</h3>
        <img src='${o.image}' alt='${o.title}'>
        <button class='view-details'>View Details</button>
        <button class='remove-favorite-button'>Remove from Favorites</button>
      </div>
    `).join(""),document.querySelectorAll(".view-details").forEach(o=>{o.addEventListener("click",async i=>{const r=i.target.closest(".recipe-card").dataset.id,n=await v(r);y(n)})}),document.querySelectorAll(".remove-favorite-button").forEach(o=>{o.addEventListener("click",i=>{const r=i.target.closest(".recipe-card").dataset.id;h(r),i.target.closest(".recipe-card").remove()})})}function s(){const t=p(),e=document.getElementById("view-favorites-button");if(t.length>0){if(!e){const o=document.createElement("button");o.id="view-favorites-button",o.textContent="View Favorites",o.addEventListener("click",A),document.body.insertBefore(o,document.querySelector("main")),o.classList.add("view-favorites-button")}}else e&&e.remove()}let u;async function N(t){l(),t=t.trim(),u&&clearTimeout(u),u=setTimeout(async()=>{if(t.length>2)try{S();const e=await w(t);l(),e.length===0?c("No recipes found."):F(e)}catch(e){console.error("Error fetching recipes:",e),l(),c("Error fetching recipes. Please try again later.")}else c("Please enter a valid search term.")},300)}const T=document.getElementById("search-bar");T.addEventListener("input",t=>{const e=t.target.value.trim();N(e)});
