//========================================================================================================
//Section9 - 106 - Rest Pattern and Parameter
//========================================================================================================
/*
INTRODUCTION:

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

    orderPasta: function(ingredient1, ingredient2, ingredient3){
        
    }
  };


  
