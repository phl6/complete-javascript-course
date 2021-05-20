'use strict';

//========================================================================================================
//Section14 - 206 Prototypes

// Prototype is very similar to class in traditional OOP
// but not entirely the same
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
console.log(Person.prototype);

// Add method to Person Prototype
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

jonas.calcAge(); //46
matilda.calcAge(); //39

console.log(jonas.__proto__);
// {calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// constructor: ƒ (firstName, birthYear)
// __proto__: Object

console.log(jonas.__proto__ === Person.prototype); //true
console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false

//Set the property of the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species); //Homo Sapiens

//jonas only has access to the prototype's species property,
//but it doesn't have the property of species
console.log(jonas.hasOwnProperty('species')); //false


