
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//import from model.js
import * as model from './model.js';
//import from view
import recipeView from './views/recipeView.js';


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

//fetch data from API
const controlRecipes = async function () {
  try {
    //***284 get the id from URL
    const id = window.location.hash.slice(1); //window.location = url, hash = #
    console.log(id);
    if(!id) return; //guard

    //Step 0: render spinner
    recipeView.renderSpinner();

    //Step 1: Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //Step 2: Rendering Recipe
    recipeView.render(model.state.recipe);
    
  } catch (err) {
    console.log(err);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//284 Listening For Load and Hashchange Events
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//listen to the change of url's #
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

//combine above 2 eventListners
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));