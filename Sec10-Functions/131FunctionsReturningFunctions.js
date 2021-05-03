'use strict';

//========================================================================================================
//Section10 - 131 - Functions Returning Functions
//========================================================================================================
/*
INTRODUCTION:


*/

const greet = function(greeting){
    return function(name){
        console.log(`${greeting} ${name}`);
    }

};

const greeterHey = greet('Hey');
greeterHey('a'); //Hey a
greeterHey('b'); //Hey b

//another way to do it
greet('Hello')('c'); //Hello c


//confusing but using arrow function to perform same action as above
const greetArr = (greeting) => (name)=>console.log(`${greeting} ${name}`) ;
greetArr('Yo')('d'); //Yo d