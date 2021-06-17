'use strict';
//========================================================================================================
//Section 17 - Modules, Tooling
//========================================================================================================

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//268 Exporting and Importing in ES6 Modules
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Importing Module (all imports are hoisted to the top)
import { addToCart, totalPrice as tPrice, tQ } from './shoppingCart.js';

addToCart('bread', 5); 
console.log(tPrice, tQ);

console.log('Importing Modules');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Import everything in a module
import * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('noodles', 5);
console.log(ShoppingCart.totalPrice);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Import default value/function from module

import add, {cart} from './shoppingCart.js';
add('pizza', 2);
add('apple', 8);
add('orange', 10);

cart.map(item => console.log(item.product, item.quantity));
// bread 5
// noodles 5
// pizza 2
// apple 8
// orange 10

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//269 Module Pattern

// IIFE - Immediately Invoked Function Expression
const shoppingCart2 = (function(){
    const cart = [];
    const shoppingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product, quantity){
        cart.push({product, quantity});
        console.log(`${quantity} ${product} added to cart`);
    };

    const orderStock = function(product, quantity){
        cart.push({product, quantity});
        console.log(`${quantity} ${product} added to cart`);
    };

    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
        // shoppingCost
    };
})();

shoppingCart2.addToCart('apple', 4);
shoppingCart2.addToCart('pizza', 2);
console.log(shoppingCart2);
console.log(shoppingCart2.shoppingCost); //undefined

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//272 Introduction to NPM

//1.npm installed lodash
//2.import lodash's cloneDeep (default export)
import cloneDeep from 'lodash-es/cloneDeep.js';

const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 6},
    ],
    user: {loggedIn: true},
};

const stateDefaultShallowClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateDefaultShallowClone.user.loggedIn); //false
console.log(stateDeepClone.user.loggedIn); //true


if(module.hot){
    module.hot.accept()
}