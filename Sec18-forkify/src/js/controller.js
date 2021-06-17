const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//282 Loading a Recipe from API
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fetch data from API 
const showRecipe = async function(){
  try {
    //Retrieve data from API
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09');
    const data = await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`);

    //Destructure and Reformat data into recipe
    let {recipe} = data.data;
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
  } catch (err) {
    alert(err);
  }
};

showRecipe();