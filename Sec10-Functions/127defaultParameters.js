'use strict';

//========================================================================================================
//Section10 - 127 - Default Parameters
//========================================================================================================
/*
INTRODUCTION:

    //NEW WAY(ES6): 
    const createBooking = function(flightNum, numPassengers = 1, price = 199*numPassengers){
        ...
    }

    --> Also support expressions / calculations inside ( )
    --> need to do it in order


    
    //OLD WAY(ES5) to assign default value：

     numPassengers = numPassengers || 1;

     --> if numPassengers is undefined, then it will assign 1 to numPassengers
    
    // numPassengers = numPassengers || 1; //old way
    // price = price || 199;   //old way

*/


//--------------------------------------------------------------------------------------------------------
// Default values
//--------------------------------------------------------------------------------------------------------

const bookings = [];

const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers){

    /*
        //OLD WAY(ES5) to assign default value：

        numPassengers = numPassengers || 1;

        --> if numPassengers is undefined, then it will assign 1 to numPassengers
    */
    // numPassengers = numPassengers || 1; //old way
    // price = price || 199;   //old way

    const booking = {
        flightNum,
        numPassengers,
        price
    }

    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123'); //{flightNum: "LH123", numPassengers: 1, price: 199} default values
createBooking('LH123', 2); // numPassengers: 2, price: 398
createBooking('LH123', 5); // numPassengers: 5, price: 995

//--------------------------------------------------------------------------------------------------------
// Skipping Parameter(s)
//--------------------------------------------------------------------------------------------------------
createBooking('LH123', undefined, 1000);  // {flightNum: "LH123", numPassengers: 1, price: 1000}



