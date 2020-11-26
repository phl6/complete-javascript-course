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