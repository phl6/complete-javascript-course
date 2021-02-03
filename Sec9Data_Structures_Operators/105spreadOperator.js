//========================================================================================================
//Section9 - 105 - Spread Operator ...
//========================================================================================================
/*
INTRODUCTION:

... <- this is the spread operator, very useful

spread operator, array, map, strings, sets, etc. are based on Iterable
Almost all JS built in data structures are based on Iterables
EXCEPT Objects

USAGE:
- To unpack an array
    -> maybe pass the unpacked array into function or object

*/

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  
    order: function(starterIndex, mainIndex){
      return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //return an array
    },
  
    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, //Open 24 hours
            close: 24,
        }
    },
  
    // ******VERY IMPORTANT*******
    //function inside an object
    //take obj as an param
    //pro: without the need of passing many param into a function, instead just parse one obj in
    orderDelivery: function( {starterIndex = 1, time = '11:00', address, mainIndex} ){ 
        console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
        will be delivered to ${address} at ${time}`);
    },

    orderPasta: function(ing1, ing2, ing3){
        console.log(`Here is your delicious pasta with ${ing1}. ${ing2}, ${ing3}.`);
    }
  };

//--------------------------------------------------------------------------------------------------------
//Old way vs New way (using spread operator)
//--------------------------------------------------------------------------------------------------------
//old way of using array
const arr = [7,8,9];
const badNewArr = [1,2,arr[1], arr[2]];
console.log(badNewArr); // [1, 2, 8, 9]

//spread operator takes out data in arr and combine it with newArr
const newArr = [1,2, ...arr]; 
console.log(newArr);    // [1, 2, 7, 8, 9]

//***return the elements of array individually
console.log(...newArr); //  1 2 7 8 9

//--------------------------------------------------------------------------------------------------------
//Adding New Element Into An Array
//--------------------------------------------------------------------------------------------------------
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu); //["Pizza", "Pasta", "Risotto", "Gnocci"]

//--------------------------------------------------------------------------------------------------------
//Copy Array [Shallow Copy]
//--------------------------------------------------------------------------------------------------------
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);  //["Pizza", "Pasta", "Risotto"]

//--------------------------------------------------------------------------------------------------------
//Join 2 or more arrays
//--------------------------------------------------------------------------------------------------------
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu); //["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad", "Pizza", "Pasta", "Risotto"]

//--------------------------------------------------------------------------------------------------------
//Iterable: Stings, arrays, maps, sets, except objects
//--------------------------------------------------------------------------------------------------------
const str = 'Jonas';
const letters = [...str, ' ', 'S.' ]; 
console.log(letters); // ["J", "o", "n", "a", "s", " ", "S."]
// console.log(`${...str} abdafds`); //error


//--------------------------------------------------------------------------------------------------------
//REAL-WORLD EXAMPLE
//--------------------------------------------------------------------------------------------------------
//Input multiple array elements using Prompt
// const ingredients = [prompt('Let\'s make pasta! Ingredient 1?'),
//                     prompt('Let\'s make pasta! Ingredient 2?'),
//                     prompt('Let\'s make pasta! Ingredient 3?')
//                     ];

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]); //same as below
// restaurant.orderPasta(...ingredients); //same as above

//--------------------------------------------------------------------------------------------------------
//Objects
//Shallow Copy
//--------------------------------------------------------------------------------------------------------
const newRestaurant = { 
    foundIn: 1998,
    ...restaurant,
     founder: 'Guiseppe',
    };

console.log(newRestaurant); 
/*
{foundIn: 1998, name: "Classico Italiano", location: "Via Angelo Tavanti 23, Firenze, Italy", categories: Array(4), starterMenu: Array(4), …}
categories: (4) ["Italian", "Pizzeria", "Vegetarian", "Organic"]
foundIn: 1998
founder: "Guiseppe"
location: "Via Angelo Tavanti 23, Firenze, Italy"
mainMenu: (3) ["Pizza", "Pasta", "Risotto"]
name: "Classico Italiano"
openingHours: {thu: {…}, fri: {…}, sat: {…}}
order: ƒ (starterIndex, mainIndex)
orderDelivery: ƒ ( {starterIndex = 1, time = '11:00', address, mainIndex} )
orderPasta: ƒ (ingredient1, ingredient2, ingredient3)
starterMenu: (4) ["Focaccia", "Bruschetta", "Garlic Br
*/

const restaurantCopy = {...restaurant}; //put Shallow Copy of restaurant to restaurnatCopy
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); //Ristorante Roma (Shallow Copy)
console.log(restaurant.name);   //Classico Italiano