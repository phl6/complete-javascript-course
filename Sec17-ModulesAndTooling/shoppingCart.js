// 'use strict'; //ES6 Modules are stritc mode by default

//For ch268 Exporting and Importing in ES6 Modules


//Exporting Module
console.log('Exporting Modules');

//these variables is scoped in this module only
// if want to use it in other module
// we will need to export it
// There are 2 types of exports: Name and Default

//Declaration
const shippingCost = 10;
export const cart = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Named export
export const addToCart = function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
};

//Named export (export multiple things)
const totalPrice = 237;
const totalQuantity = 23;

//alias
export{totalPrice, totalQuantity as tQ};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Default export
// use it when only want to export one thing in module

export default function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
};
