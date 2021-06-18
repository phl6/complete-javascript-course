// import icons from '../${icons}'; //Parcel 1, for live server
import icons from 'url:../img/icons.svg'; //Parcel 2, 'url:' is used for static asset files, e.g. sound, photo, video, etc.
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//api website: https://forkify-api.herokuapp.com/v2

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//282 Loading a Recipe from API (step1)
//283 Rendering Recipe (step2)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//283
const renderSpinner = function(parentEL){
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;

  parentEL.innerHTML = "";
  parentEL.insertAdjacentHTML('afterbegin', markup);
};


//fetch data from API
const showRecipe = async function () {
  try {
    //***284 get the id from URL
    const id = window.location.hash.slice(1); //window.location = url, hash = #
    console.log(id);
    if(!id) return; //guard

    //Step 0: render spinner
    renderSpinner(recipeContainer);

    //Step 1: Loading Recipe (Sec282)
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09'
      //284
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    //Destructure and Reformat data into recipe
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    //Step 2: Rendering Recipe
    let markup = `
                <figure class="recipe__fig">
                  <img src=${recipe.image} alt=${recipe.title} class="recipe__img" />
                  <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                  </h1>
                </figure>

                <div class="recipe__details">
                  <div class="recipe__info">
                    <svg class="recipe__info-icon">
                      <use href="${icons}#icon-clock"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
                    <span class="recipe__info-text">minutes</span>
                  </div>
                  <div class="recipe__info">
                    <svg class="recipe__info-icon">
                      <use href="${icons}#icon-users"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text">servings</span>

                    <div class="recipe__info-buttons">
                      <button class="btn--tiny btn--increase-servings">
                        <svg>
                          <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                      </button>
                      <button class="btn--tiny btn--increase-servings">
                        <svg>
                          <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="recipe__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
                  <button class="btn--round">
                    <svg class="">
                      <use href="${icons}#icon-bookmark-fill"></use>
                    </svg>
                  </button>
                </div>

                <div class="recipe__ingredients">
                  <h2 class="heading--2">Recipe ingredients</h2>
                  <ul class="recipe__ingredient-list">
                  ${recipe.ingredients.map(ing => {
                    return ` <li class="recipe__ingredient">
                                <svg class="recipe__icon">
                                  <use href="${icons}#icon-check"></use>
                                </svg>
                                <div class="recipe__quantity">${ing.quantity === null ? "Some" : ing.quantity}</div>
                                <div class="recipe__description">
                                  <span class="recipe__unit">${ing.unit}</span>
                                  ${ing.description}
                                </div>
                              </li>`
                  }).join(' ')}
                  </ul>
                </div>

                <div class="recipe__directions">
                  <h2 class="heading--2">How to cook it</h2>
                  <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">${recipe.publisher}</span>.
                    Please check out directions at their website.
                  </p>
                  <a
                    class="btn--small recipe__btn" href="${recipe.sourceURL}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                  </a>
                </div>
                `;
    //clear the content of the HTML
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML('afterbegin', markup);


  } catch (err) {
    alert(err);
  }
};

showRecipe();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//284 Listening For Load and Hashchange Events
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//listen to the change of url's #
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

//combine above 2 eventListners
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));