'use strict';
//========================================================================================================
//Section9 - 103 - Destructuring Array
//========================================================================================================

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
};
//--------------------------------------------------------------------------------------------------------
const arr = [0,1,2];

const a = arr[0];
const b = arr[1];
const c = arr[2];
 
//***Destructuring the array from the right side***
const [x, y, z] = arr; 
console.log(x,y,z); // 0 1 2

//extract the first two elements of the array
const [first1, second1] = restaurant.categories;
console.log(first1, second1); // Italian Pizzeria

//extract only the first and third elements
let [main, ,secondary] = restaurant.starterMenu;
console.log(main, secondary); //Focaccia Garlic Bread

//--------------------------------------------------------------------------------------------------------
//Swapping Variables
//--------------------------------------------------------------------------------------------------------
// const temp = main;
// main = secondary;
// secondary = temp;

// console.log(main, secondary); //Garlic Bread Focaccia
[main, secondary] = [secondary, main];
console.log(main, secondary); //Garlic Bread Focaccia

//--------------------------------------------------------------------------------------------------------
//Destructuring an array 
//--------------------------------------------------------------------------------------------------------
console.log(restaurant.order(2,0)); //["Garlic Bread", "Pizza"], which is an array
const [starter, mainCourse] = restaurant.order(2, 0); //function delcard in restaurant obj
console.log(starter, mainCourse); //Garlic Bread Pizza, which is separate element

//--------------------------------------------------------------------------------------------------------
//Nested Destructuring
//--------------------------------------------------------------------------------------------------------
const nested = [2, 4, [5,6]]; //array inside an array
// const [i, ,j] = nested;
// console.log(i, j); // (2), [5,6]

const [i, ,[j,k]] = nested;
console.log(i, j, k); //2 5 6

//--------------------------------------------------------------------------------------------------------
//Default Values
//--------------------------------------------------------------------------------------------------------
const [p=1, q=1, r=1] = [8, 9];
console.log(p,q,r); //8 9 1





