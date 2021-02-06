"use strict"
//========================================================================================================
//Section9 - 110 - for of loop
//========================================================================================================
/*
INTRODUCTION:

 creates a loop iterating over iterable objects 
 e.g. built-in String, Array, array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined iterables


EXAMPLE:
    const array1 = ['a', 'b', 'c'];

    for (const element of array1) {
    console.log(element);
    }

    // expected output: "a"
    // expected output: "b"
    // expected output: "c"

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
    },

    orderPizza: function(mainIngredient, ...otherIngredients){ //only mainIngredient is compulsory, otherIngredients are optional
        console.log(mainIngredient);
        console.log(otherIngredients);   //return otherIngredients array
    }
  };

//--------------------------------------------------------------------------------------------------------
// Looop through array
//--------------------------------------------------------------------------------------------------------
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu); //["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad", "Pizza", "Pasta", "Risotto"]

for (const item of menu){
    console.log(item);
}
// Focaccia
// Bruschetta
// Garlic Bread
// Caprese Salad
// Pizza
// Pasta
// Risotto

//--------------------------------------------------------------------------------------------------------
// *****ENTRIES***** - return current index and the element itself
//--------------------------------------------------------------------------------------------------------
const mainMenu = restaurant.mainMenu;

for (const item of mainMenu.entries()){
    console.log(item);
}
// [0, "Pizza"]
// [1, "Pasta"]
// [2, "Risotto"]

// console.log([...mainMenu.entries()]);


//--------------------------------------------------------------------------------------------------------
// Start menu at index 1 (2 Approaches)
//--------------------------------------------------------------------------------------------------------
//First Approach
for (const item of mainMenu.entries()){
    console.log(`${item[0]+1}:${item[1]}`);
}
// 1:Pizza
// 2:Pasta
// 3:Risotto

//*****Second Approach*****
for (const [i,el] of mainMenu.entries()){
    console.log(`${i+1}:${el}`);
}

