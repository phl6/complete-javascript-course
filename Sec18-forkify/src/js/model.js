import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './views/helpers.js';

export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
      page: 1,
      resultsPerPage: RES_PER_PAGE,
    },
    
};

export const loadRecipe = async function(id){
    try {
        const data = await getJSON(`${API_URL}${id}`);
      
          //Destructure and Reformat data into recipe
          const { recipe } = data.data;
          state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
          };
      
        //   console.log(state.recipe);
    } catch (error) {
        throw error;
    }
};


export const loadSearchResults = async function(query){
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

// loadSearchResults('pizza');

export const getSearchResultsPage = function(page = state.search.page){
  state.search.page = page; //store a variable in state
  //setting the range of displayed items
  const start = (page-1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;

  return state.search.results.slice(start, end);
};


