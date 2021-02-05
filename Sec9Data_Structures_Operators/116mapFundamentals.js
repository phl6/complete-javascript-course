'use strict';
//========================================================================================================
//Section9 - 116 - Maps Fundamentals
//========================================================================================================
/*
INTRODUCTION:
The Map object holds key-value pairs and remembers the original insertion order of the keys. 
Any value (both objects and primitive values) may be used as either a key or a value.

A Map object iterates its elements in insertion order 
— a for...of loop returns an array of [key, value] for each iteration.

Object vs Map:
Object is similar to Map—both let you set keys to values, 
retrieve those values, delete keys, and detect whether something is stored at a key.
For this reason (and because there were no built-in alternatives), Object has been used as Map historically.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map


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
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //return an array
  },

  openingHours,

  // ******VERY IMPORTANT*******
  //function inside an object
  //take obj as an param
  //pro: without the need of passing many param into a function, instead just parse one obj in
  orderDelivery: function ({
    starterIndex = 1,
    time = '11:00',
    address,
    mainIndex,
  }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
        will be delivered to ${address} at ${time}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}. ${ing2}, ${ing3}.`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    //only mainIngredient is compulsory, otherIngredients are optional
    console.log(mainIngredient);
    console.log(otherIngredients); //return otherIngredients array
  },
};
//--------------------------------------------------------------------------------------------------------
// Create empty map and setting map keys and value
//--------------------------------------------------------------------------------------------------------
const rest = new Map(); 
rest.set('name', 'Classico Italiano');
rest.set('1', 'Firenze, Italy');
console.log(rest.set('2', 'Lisbon, Portugal'));
// 0: {"name" => "Classico Italiano"}
// 1: {"1" => "Firenze, Italy"}
// 2: {"2" => "Lisbon, Portugal"}

//--------------------------------------------------------------------------------------------------------
// Setting maps in a chain
//--------------------------------------------------------------------------------------------------------
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', '23')
  .set(true, 'We are open :D')
  .set(false, 'We are close :('); 

//--------------------------------------------------------------------------------------------------------
// Retrieve value by its key
//--------------------------------------------------------------------------------------------------------
// 1) key is primitive data type
console.log(rest.get(true));  //We are open :D

// 2) key is string or object
console.log(rest.get('open')); //11

// 3) retrieve value by comparing values
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); //We are open :D

//--------------------------------------------------------------------------------------------------------
// Checking if map has the key ---- .has()
//--------------------------------------------------------------------------------------------------------
console.log(rest.has('categories')); //true
console.log(rest.has('fakeKey'));  //false

//--------------------------------------------------------------------------------------------------------
// Size of map ---- .size
//--------------------------------------------------------------------------------------------------------
console.log(rest.size);  //7

//--------------------------------------------------------------------------------------------------------
// Deleting map element ---- .delete()
//--------------------------------------------------------------------------------------------------------
console.log(rest.has('2')); //true
rest.delete('2');
console.log(rest.has('2')); //false

//--------------------------------------------------------------------------------------------------------
// Using Array as key
//--------------------------------------------------------------------------------------------------------
// Problem 1)
rest.set([1,2], 'Problem1: Cannot declare like this'); 
console.log(rest);
// 7: {Array(2) => "Problem1: Cannot declare like this"}
// key: (2) [1, 2]
// value: "Problem1: Cannot declare like this"

console.log(rest.get([1,2])); 
//undefined, because this array is different to the array that declared in map on line 132
//they are different object in the heap, memory

// Solution of Problem 1)
const arr = [1,2];
rest.set(arr, 'Solution1: Should declare like this');
console.log(rest.get(arr)); //Solution1: Should declare like this

//--------------------------------------------------------------------------------------------------------
// Using Object as key ***Useful when using DOM
//--------------------------------------------------------------------------------------------------------
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest); //{h1 => "Heading"}





//--------------------------------------------------------------------------------------------------------
// Deleting all elements in a map ---- .clear()
//--------------------------------------------------------------------------------------------------------
// rest.clear();
console.log(rest.size); // 0