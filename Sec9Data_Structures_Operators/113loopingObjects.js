"use strict"
//========================================================================================================
//Section9 - 113 - Looping Objects: Object Keys, Values, and Entries
//========================================================================================================
/*
INTRODUCTION:


*/
const weekdays = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

const openingHours = {
    [weekdays[3]]: {
        open: 12,
        close: 22,
    },
    [weekdays[4]]: {
        open: 11,
        close: 23,
    },
    [weekdays[5]]: {
        open: 0, //Open 24 hours
        close: 24,
    }
};

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  
    order: function(starterIndex, mainIndex){
      return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //return an array
    },
    
    openingHours,
  
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

// console.log(openingHours);

//--------------------------------------------------------------------------------------------------------
// Properties Name ---- Object.keys()
//--------------------------------------------------------------------------------------------------------
const properties = Object.keys(openingHours);
// console.log(properties); // returns an array: ["thu", "fri", "sat"]

// console.log(`We are open on ${properties.length} days`); //We are open on 3 days


// for(const day of Object.keys(openingHours)){
//     console.log(day);
// }
// thu
// fri
// sat

//Final Result
let openStr = `We are open on ${properties.length} days: `;
for(const day of properties){
    openStr = openStr + `${day} `; 
}
console.log(openStr);

//--------------------------------------------------------------------------------------------------------
// Properties Values  ---- Object.values()
//--------------------------------------------------------------------------------------------------------
const values = Object.values(openingHours);
console.log(values);
// 0: {open: 12, close: 22}
// 1: {open: 11, close: 23}
// 2: {open: 0, close: 24}

for (const x of values){
    console.log(x);
}

//--------------------------------------------------------------------------------------------------------
// Entire Object ---- Object.entries()
//--------------------------------------------------------------------------------------------------------
const entries = Object.entries(openingHours);
console.log(entries);

for(const x of entries){
    console.log(x);
}
// 0: "thur"
// 1: {open: 12, close: 22}
// 0: "fri"
// 1: {open: 11, close: 23}
// 0: "sat"
// 1: {open: 0, close: 24}

for (const [day, {open, close}] of entries){ //just like in loop array
    console.log(`On ${day} we open at ${open} and close at ${close}.`);
}
// On thur we open at 12 and close at 22.
// On fri we open at 11 and close at 23.
// On sat we open at 0 and close at 24.
