export const state = {
    recipe: {},
    search: {},
    bookmark: []
};

export const loadRecipe = async function(id){
    try {
        //Step 1: Loading Recipe (Sec282)
        const res = await fetch(
            // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09'
            //284
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
          );
          const data = await res.json();
      
          if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      
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
      
          console.log(state.recipe);
    } catch (error) {
        console.error(error);
    }
}