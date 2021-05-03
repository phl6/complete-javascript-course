'use strict';

//========================================================================================================
//Section10 - 136 -  Closures
//========================================================================================================
/*
INTRODUCTION:
A function has access to the Variable Environment(VE) of the execution context in which it was created.
Closure: VE attached to the function, exactly as it was at the time and pace the function was created. 


A closure gives a function access to all the variables of "its parent function", even after that parent 
has returned. The function keeps a "reference" to its outer scope, which preserves the scope chain
throughout time.

A closure makes sure that a function doesn't lose connection to variables that existed at the function's
birth place.


*/

const secureBooking = function () {
    let passengerCount = 0;

    return function () {
      passengerCount++;
      console.log(`${passengerCount} passengers`);
    };
  };
  const booker = secureBooking();

  booker(); //1 passengers
  booker(); //2 passengers
  booker(); //3 passengers

console.dir(booker); //scoper -> Scopers[3] -> 0: Closure(secureBooking) -> passengerCount:3


//========================================================================================================
//Section10 - 137 -  More Closures Examples
//========================================================================================================

//Example 1
let f;
const g = function() {
  const a = 23;
  f = function(){
    console.log(a*2);
  }
}

const h = function(){
  const b = 777;
  f = function(){
    console.log(b*2);
  }
}

//Assigning f function
g(); 
f(); //46

//Re-assigning f function
h();
f(); //1554
console.dir(f);


//Re-assigning f function
g();
f(); //46

//Example 2
const boardPassengers = function(n, wait){
  const perGroup = n / 3;

  setTimeout(function() {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
}

const perGroup = 1000; //if there's no local variable in the closure, then it would use this

boardPassengers(180, 3);
//Will start boarding in 3 seconds
//We are now boarding all 180 passengers
//There are 3 groups, each with 60 passengers
