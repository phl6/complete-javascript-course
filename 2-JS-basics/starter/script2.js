//enable strict mode, must be placed on the 1st line
//better for developer
//forbids to do certain things
'use strict'; 
//---------------------------------------------------------------------------------------------------------------------------
//Chapter32-Activating Strict Mode
// let hasDriversLicense = false;
// const passTest = true;

// if(passTest) hasDriversLicense = true; //purposely missing a s in hasDriversLicense
// if(hasDriversLicense) console.log('I can drive'); //show error with strict mode on, and show nothing with strict mode off

// //const interface = 'Audio'; //strict mode on will lead to display Syntax erro for reserved word

//---------------------------------------------------------------------------------------------------------------------------
//Chapter33-Function
function logger(){
    console.log('function logger used here');
}

logger();

function fruitProcessor(apples, oranges){
    console.log(apples, oranges);
    const juice =  `Juice with ${apples} apples and ${oranges} oranges`;
    return juice
}

const appleJuice = fruitProcessor(5,0);
console.log(appleJuice);

console.log(fruitProcessor(3, 5));

//filter (Learn from youtube)
//filter uses higher order function inside the bracket
const arr1 = ['z','a','c','d','b'];
const arr2 = [1, 2, 3, 4];
const arr_merge = [...arr1, ...arr2];
console.log(arr_merge);

const animals = ["owl", "frog", "canary", "duck", "duck", "goose", "owl"];
// Parameters example: 'owl', 0, ['owl', 'frog', 'canary', 'duck', 'duck', 'goose', 'owl']
const filteredAnimals = animals.filter((animal, index, arr) => arr.indexOf(animal) == index);
console.log(filteredAnimals);

const numbers = [1 ,-1, 2, 3];
const positiveNums = numbers.filter(n => n >= 0);

console.log(positiveNums); 
console.log(arr1.sort());

let vals = [5, 4, 9, 2, 1];

function isEven(num){
    return num%2 == 0 ? true : false;
}

//the following 2 are the same
console.log('using normal function: ' + numbers.filter(isEven));
console.log('using arrow function: ' + numbers.filter((n) => n%2 == 0));

