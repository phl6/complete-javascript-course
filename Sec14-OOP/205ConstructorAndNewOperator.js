'use strict';

//========================================================================================================
//Section14 - 205 Constructor Functions and The new Operator
//
// Constructor function always start with Capital Letter
//
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}
//========================================================================================================

//This is a Constructor
const Person = function(firstName, birthYear){
    //Instance Properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    //Never do this
    //Methods
    // this.calcAge = function(){
    //     console.log(2037 - this.birthYear);
    // }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('Matilda', 1998);
const jack = new Person('Jack', 2017);
const jay = "";

console.log(matilda, jack);

console.log(jonas instanceof Person); //true
console.log(jay instanceof Person); //false
