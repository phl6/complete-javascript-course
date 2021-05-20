'use strict';

//========================================================================================================
//Section14 - 208 Prototype Inheritance With Built-in Objects
//========================================================================================================

//--------------------------------------------------------------------------------------------------------------
// 205 Constructor Functions and the new Operator
//--------------------------------------------------------------------------------------------------------------
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

//Object instantiation
const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 1998);
const jay = "";

//--------------------------------------------------------------------------------------------------------------
// 206 Prototypes
//--------------------------------------------------------------------------------------------------------------

// ***Add method to Person Prototype
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

//--------------------------------------------------------------------------------------------------------------
// 208 Prototype Inheritance With Built-in Objects
//--------------------------------------------------------------------------------------------------------------
console.log(jonas.__proto__); //{calcAge: ƒ, constructor: ƒ}
//Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor); //ƒ Person(firstName, birthYear)

//Prototype of array
const arr = [3,6,4,5,6,9,3]; // new Array === []

console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //true

//Add a new method to Array prototype, therefore all the array inherits this method
//But this is BAD code
//just an experiment
Array.prototype.unique = function(){
    return [...new Set(this)];
}

console.log(arr.unique()); //(5) [3, 6, 4, 5, 9]

console.dir(x => x+1);

