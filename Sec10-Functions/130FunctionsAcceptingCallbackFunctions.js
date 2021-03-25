'use strict';

//========================================================================================================
//Section10 - 130 - Functions Accepting Callback Functions
//========================================================================================================
const oneWord = function(str){
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

//higher order function
const transformer = function(str, fn){
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
}

transformer('Javascript is the best', oneWord); //javascriptisthebest
transformer('Javascript is the best', upperFirstWord); //JAVASCRIPT is the best

