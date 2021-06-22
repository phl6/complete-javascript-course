import 'core-js/stable';
import 'regenerator-runtime/runtime';

//import from model.js
import * as model from './model.js';
//import from view
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import paginationView from './views/paginationView.js';


//api website: https://forkify-api.herokuapp.com/v2

//Codes come from Parcel
if(module.hot){
  module.hot.accept();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//282 Loading a Recipe from API (step1)
//283 Rendering Recipe (step2)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    //***284 get the id from URL
    const id = window.location.hash.slice(1); //window.location = url, hash = #
    if(!id) return; //guard

    //Step 0: render spinner
    recipeView.renderSpinner();

    //Step 1: Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //Step 2: Rendering Recipe
    recipeView.render(recipe);
    
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function(){
  try {
    //0) render Spinner
    resultsView.renderSpinner();
    // console.log(resultsView);

    //1) Get search query
    const query = searchView.getQuery();
    if(!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    //3) Render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));

    console.log(model.state.search);
    //4) Render Inital Pagination button
    paginationView.render(model.state.search);

  } catch (error) {
    console.log(error);
  }
}

const controlPagination = function(goToPage){
  console.log(goToPage);

  //3) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //4) Render NEW Pagination buttons
  paginationView.render(model.state.search);

}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//284 Listening For Load and Hashchange Events
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//listen to the change of url's #
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

//combine above 2 eventListners
// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

//287 Implement Publisher-Subscriber Pattern
//Subscribers
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
