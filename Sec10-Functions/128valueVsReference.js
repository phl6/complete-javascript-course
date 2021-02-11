'use strict';

//========================================================================================================
//Section10 - 128 - How Passing Arguments Works - Value vs Reference
//========================================================================================================
/*
INTRODUCTION:


*/


//--------------------------------------------------------------------------------------------------------
// 
//--------------------------------------------------------------------------------------------------------

const flight = 'LH234'; //primitive type, string
const jonas = { //object
    name: 'Jonas Schmedtmann',
    passport: 24739479284,

}

const checkIn = function(flightNum, passenger){
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 24739479284){
        alert('Check in')
    }else{
        alert('Wrong Passport');
    }
}

checkIn(flight, jonas)

//VALUE
//Value DOESN'T change as flight is primitive type
console.log(flight); // LH234

//VS

//REFERENCE
//Value DOES Changed as jonas is an Object
console.log(jonas);  // {name: "Mr. Jonas Schmedtmann", passport: 24739479284}