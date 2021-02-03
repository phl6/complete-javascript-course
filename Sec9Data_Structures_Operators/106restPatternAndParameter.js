//========================================================================================================
//Section9 - 106 - Rest Pattern and Parameter
//========================================================================================================
/*
INTRODUCTION:

Rest Patten and Spread Operator share the same syntax ...
But, do the opposite thing of each other.

USAGE:
-Collect multiple elements and pack them into an array or object

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

// 1. Destructuring
//--------------------------------------------------------------------------------------------------------
// SPREAD VS REST
//--------------------------------------------------------------------------------------------------------
// SPREAD, because ... is on RIGHT side of assignment operator(=)
const spreadArr = [1,2, ...[3,4]];
console.log(spreadArr); //[1, 2, 3, 4]

// REST, because ... is on LEFT side of assignment operator(=)
const [a, b, ...others] = [1,2,3,4,5];
console.log(a, ...others); //1 3 4 5

const [pizza, ,risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood); //Pizza Risotto ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

//--------------------------------------------------------------------------------------------------------
// REST on Objects
//--------------------------------------------------------------------------------------------------------
 const {sat, ...weekdays} = restaurant.openingHours;
console.log(weekdays); //fri: {open: 11, close: 23} thu: {open: 12, close: 22}



// 2. Function
//--------------------------------------------------------------------------------------------------------
// 
//--------------------------------------------------------------------------------------------------------
const add = function(...numbers) {
    console.log(numbers);
    let sum = 0;
    for(let i = 0; i<numbers.length; i++) sum += numbers[i];
    return sum;
}

console.log(add(2,3)); //5
console.log(add(5,3,7,2)); //17
console.log(add(8,2,5,3,2,1,4)); //25

const arrX = [23,5,7];
console.log(add(...arrX)); //35 


//*****************IMPORTANT */
restaurant.orderPizza('Main_mushroom', 'otherA', 'otherB', 'otherC'); 
//Main_mushroom
//["otherA", "otherB", "otherC"]

restaurant.orderPizza('Main_Brocoli');
//Main_Brocoli
//[]