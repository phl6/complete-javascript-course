'use strict';
//========================================================================================================
//Section9 - 104 - Destructuring Objects
//========================================================================================================
/*
Destructuring objects is very similar to destructuring arrays

***IT'S EXTREMELY USEFUL WHEN USING API***

*/


// Data needed for first part of the section
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
};

//--------------------------------------------------------------------------------------------------------
//Destructuring Objects
//--------------------------------------------------------------------------------------------------------
//simple destructuring
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories); 

//setting "ALIAS"
const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

//assigning "DEFAULT VALUES" to objects that don't exist
//assigning default value [] empty array
const {menu = [], starterMenu: starter = [] } = restaurant;
console.log(menu, starter); //[] ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

//--------------------------------------------------------------------------------------------------------
//Mutating Variables When Destructuring
//--------------------------------------------------------------------------------------------------------
let a = 111;
let b = 999;

const obj = {a: 23, b: 7, c: 14};

//Destructuring elements in obj with the same variables name declared
({a,b} = obj)
console.log(a, b); //23 7

//--------------------------------------------------------------------------------------------------------
//Nested Objects
//--------------------------------------------------------------------------------------------------------
const {sat} = openingHours;
console.log(sat); //{open: 0, close: 24}

//put extra bracket 
const {fri: {open: friOpen, close: friClose}} = openingHours;
console.log(friOpen, friClose); //11 23


// ******VERY IMPORTANT*******
//work with function 
//PASSING AN OBJECT AS A PARAM TO CALL A FUNCTION IN AN OBJECT
restaurant.orderDelivery({
    time: '22:30',
    address: '123 abc street',
    mainIndex:  2,
    starterIndex: 2,
}); //Order received! Garlic Bread and Risotto will be delivered to 123 abc street at 22:30

