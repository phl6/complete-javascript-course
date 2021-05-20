'use strict';

//========================================================================================================
//Section14 - 210 ES6 Classes
//========================================================================================================

//--------------------------------------------------------------------------------------------------------------
// 205 - 209
//--------------------------------------------------------------------------------------------------------------
//This is a Constructor function
const Person = function(firstName, birthYear){
    //Instance Properties
    this.firstName = firstName;
    this.birthYear = birthYear;
}

// ***Add method to Person Prototype
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

//Object instantiation
const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 1998);
const jay = "";



//--------------------------------------------------------------------------------------------------------------
// 210 ES6 Classes
//
// 1. Classes are NOT hoisted
// 2. Class are first-class citizen
// 3. Classes are executed in strict mode
//--------------------------------------------------------------------------------------------------------------
// Class Expression
// const PersonCl = class {

// }

// Class Declaration
class PersonCl {
    constructor(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    //Methods will be added to .prototype property
    calcAge(){
        console.log(2037 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.firstName}`);
    };
};


// PersonCl.prototype.greet = function(){
//     console.log(`Hey ${this.firstName}`);
// };

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge(); //41

console.log(jessica.__proto__ === PersonCl.prototype); //true


jessica.greet(); //Hey Jessica

