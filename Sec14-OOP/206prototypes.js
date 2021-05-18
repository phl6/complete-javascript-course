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
