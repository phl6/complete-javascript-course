"use strict";

//========================================================================================================
//Section9 - 132 The Call and Apply Methods

//****IMPORTANT****

//CALL METHOD 
// allows us to MANUALLY and EXPLICITLY set the "this" keyword to the first argument of call method
// make sure all the PROPERTY NAMES in later objects are the same as the object where the function is stored,
// otherwise, underdefined will be generated

//APPLY METHOD - not used much anymore
//only difference is APPLY takes in an array as parameter, whereas CALL METHOD takes everything

//========================================================================================================


const lufthansa = {
    airline: 'lufthansa',
    iataCode: 'LH',
    bookings: [],
    book: function(flightNum, name){
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({flight: `${this.iataCode}${this.flightNum}, name`})
    },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(653, 'Jogn Smith');
console.log(lufthansa);


const eurowings = {
    airline: 'EuroWings',
    iataCode: 'EW',
    bookings: [],
};

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

const book = lufthansa.book; //good practice: to copy the existed function and make a global function, there it can be used by different obj


//--------------------------------------------------------------------------------------------------------
// Examples of why it shows error
//--------------------------------------------------------------------------------------------------------
// DOES NOT WORK
// book(23, 'Sarah Williams'); //Cannot read property 'airline' of undefined, since book function here is just a regular function call, this keyword here will point to undefined

// DOES NOT WORK TOO
// eurowings.book(23, 'Sarah Williams'); //eurowings.book is not a function


//--------------------------------------------------------------------------------------------------------
// CALL METHOD
//--------------------------------------------------------------------------------------------------------
//call Method calls book function with the this keyword set to eurowings
//this allows us to manually and explicity set the this keyword to the first argument of call method

book.call(eurowings, 23, 'Sarah Williams'); //Sarah Williams booked a seat on EuroWings flight EW23

book.call(lufthansa, 53, 'Marry Jane'); //Marry Jane booked a seat on lufthansa flight LH53

book.call(swiss, 44, 'Holly Drinkwater'); //Holly Drinkwater booked a seat on Swiss Air Lines flight LX44


//--------------------------------------------------------------------------------------------------------
// APPLY METHOD - not used much anymore
//--------------------------------------------------------------------------------------------------------
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData); //George Cooper booked a seat on Swiss Air Lines flight LX583
console.log(swiss); //


//USE call but same effect as using APPLY by using ...SPREAD OPERATOR
book.call(swiss, ...flightData); //George Cooper booked a seat on Swiss Air Lines flight LX583