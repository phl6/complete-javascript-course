'use strict';

//========================================================================================================
//Section10 - 129 - First-Class vs. Higher-Order Function 
//========================================================================================================
/*
INTRODUCTION:

----------------------
First-Class Function
----------------------
->JS treats functions as first-class citizen
->This means that functions are simply values
->Functions are just another "type" of Object

-> Return functions FROM functions

-> store function in variables or properties:
e.g.
1)  const add = (a,b) => a + b;

2)  const counter = {
        value: 23,
        inc: function() {this.value++}
    }

-> pass functions as args to OTHER functions:
e.g. 
const greet = () => console.log('Hey Jonas');
btnClose.addEventListener('click', greet);


-> call methods on functions
e.g.
counter.inc.bind(someOtherObject);


-----------------------
Higher Order Function
-----------------------
1)->A function that receives another function as an argument, that returns a new function, or both
2)->This is only possible because of first-class functions

1) Function that receives another function:
--addEventListener is a higher-order function, while greet is callback function

const greet = console.log('HeyJonas');
btnClose.addEventListener('click', greet); 

2) Function that returns a new function:
count() is a higher order function here

function count(){
    let counter = 0;
    return function(){ //returned function declared
        counter++;
    }
}

*/


