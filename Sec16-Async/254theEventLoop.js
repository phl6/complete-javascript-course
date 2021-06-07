'use strict';

//========================================================================================================
//Section14 - 252 The Event Loop in Practice
//
// "251 Async Behind the Scenes: The Event Loop" is an extremely informative lecture
// watch if there's any confusion
//========================================================================================================


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch251 The Event Loop in Practice

//Example 1

// console.log('Test start');
// //callback queue
// setTimeout(()=> console.log('0 sec timer'), 0);
// //Micro tasks queue
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end');

// // Test start
// // Test end
// // Resolved promise 1
// // 0 sec timer

//Example 2

console.log('Test start');
//callback queue
setTimeout(()=> console.log('0 sec timer'), 0);
//Micro tasks queue
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
    for(let i = 0; i < 1000000000; i++){};
    console.log(res)
});

console.log('Test end');

// Test start
// Test end
// Resolved promise 1
// 0 sec timer

