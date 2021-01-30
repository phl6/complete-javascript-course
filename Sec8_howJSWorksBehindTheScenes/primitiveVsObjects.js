"use strict"
//========================================================================================================
//CH.99-100 Primitives vs Objects
//========================================================================================================

// *********IMPORTANT**********
// [PRIMITIVE]: (CALL STACK) Identifier-> address -> value (actual value)
// [REFERENCE TYPE]: (CALL STACK) Identifier-> address -> value (address of the object/array/funciton stored in HEAP) -> (HEAP) Address -> Value

// const value which is PRIMTIVE type is "UNchangeable"
// const value REFERENCE type is "Changeable"

//========================================================================================================
//Primitives: Number, String, Boolean, Undefined, Null, Symbol, BigInt
let age = 30;
let oldAge = age;
age = 31;

console.log(age); //31
console.log(oldAge); //30

//--------------------------------------------------------------------------------------------------------
//References: Object Literals, Arrays, Functions...
const me = {
    name: 'JOnas',
    age: 30,
};

const friend = me; //copy object
// !!! me and friend now are pointing to the same object in heap
// !!! therefore when friend.age is changed, me.age is changed too. (UNLIKE PRIMITIVE TYPE)
friend.age = 27;
console.log(`Friends`, friend.age); //27
console.log(`Me`, me.age); //27

//========================================================================================================
//Ch.100 practice 

//SHARING THE SAME OBJECT IN THE HEAP
const jessica = {
    firstname: 'Jessica',
    lastname: 'William',
    age: '27',
};

const jessicaMarried = jessica;

jessicaMarried.lastname = 'Davis';

//as above, both objects are pointing to the same object in the heap
//so if one object's value is changed, another is changed too.
console.log('After Marriage: ', jessicaMarried.lastname); //Davis
console.log('Before Marriage: ', jessica.lastname); //Davis


//--------------------------------------------------------------------------------------------------------
//                                       SOLUTION
//!!!!!!SHALLOW COPY!!!!!!!
const jessica2 = {
    firstname: 'Jessica',
    lastname: 'William',
    age: '27',
    family: ['a', 'b'],
};

//what's doing here is SHALLOW COPY: 
//we create an empty object, then assign jessica2 into this new object
//now jessicaMarried2 has a new location in the heap, which is not shared, totally new
//when data is changed in jessicaMarried2, data of jessica2 won't be changed too
const jessica2Copy = Object.assign({}, jessica2);
jessica2Copy.lastname = 'Davis';

console.log('After Marriage: ', jessica2Copy.lastname); //Davis
console.log('Before Marriage: ', jessica2.lastname); //William

// HOWEVER...
// for shallow copy, the reference type, such like here the family array, 
// the new copy object will still point to the same location of the old object
jessica2Copy.family.push('c');
jessica2Copy.family.push('d');

console.log('After Marriage: ', jessica2Copy); //both array return 4 elements
console.log('Before Marriage: ', jessica2); //both array return 4 elements


