"use strict"

//CH.96 this keyword
//========================================================================================================
console.log(this); // global object, return Window

//Function Expression
const calcAge = function(birthYear){
    console.log(2037-birthYear);
    console.log(this);
}

calcAge(1991); //undefined

//Normal Function
function calcAgeNormal(birthYear){
    console.log(2037-birthYear);
    console.log(this);
}

calcAgeNormal(1991); //undefined

//--------------------------------------------------------------------------------------------------------
//Arrow Function
const calcAgeArrow = (birthYear) => {
    console.log(2037-birthYear);
    console.log(this);
}

calcAgeArrow(1991); //return Window
//--------------------------------------------------------------------------------------------------------
//'this' inside an object method
// ***IMPORTANT***
const jonas = {
    year:1991,
    calcAge: function(){
        console.log(2037 - this.year);
    }
}

jonas.calcAge(); //"this" keyword inside a method returns the object who calls it


const matilda = {
    year: 2017,
};

matilda.calcAge = jonas.calcAge; //COPY jonas's calcAge to matilda
console.log(matilda); //now matilda has function calcAge
matilda.calcAge(); //returns 20 here, now it proves that this keyword belongs to the object which calls the method

const f = jonas.calcAge;
// f();  //returns error, because this is just a normal function call, not an object calling the function