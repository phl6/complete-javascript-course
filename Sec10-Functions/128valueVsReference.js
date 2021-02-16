'use strict';

//========================================================================================================
//Section10 - 128 - How Passing Arguments Works - Value vs Reference
//========================================================================================================
/*
INTRODUCTION:


-creating a copy, changing the copy won't affect the original variable
-pass by value, since jonas is primitive data type

const flightNum = flight; 

-creating a copy, change the content of copy will ALSO change the content of the original object
-pass by reference, since jonas is an object

const passenger = jonas; 


*/


const flight = 'LH234'; //primitive type, string
const jonas = { //object
    name: 'Jonas Schmedtmann',
    passport: 24739479284,
}

const checkIn = function(flightNum, passenger){
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 24739479284){
        console.log('Check in');
    }else{
        alert('Wrong Passport');
    }
}

checkIn(flight, jonas)

//--------------------------------------------------------------------------------------------------------
// PASS by VALUE
//--------------------------------------------------------------------------------------------------------
//Value DOESN'T change as flight is primitive type
console.log(flight); // LH234

//VS

//--------------------------------------------------------------------------------------------------------
//REFERENCE
//--------------------------------------------------------------------------------------------------------
//jonas.name DOES Changed as jonas is an Object
console.log(jonas);  // {name: "Mr. Jonas Schmedtmann", passport: 24739479284}


const newPassport = function(person){
    person.passport = Math.trunc(Math.random()*100000000000);    
}

newPassport(jonas); //changing the passport number
checkIn(flight, jonas); //alert: Wrong Passport