'use strict';

//========================================================================================================
//Section14 - 255 Buidling a simpel PROMISE
//
//promise is a special kind of object in JS
//========================================================================================================


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//**********Ch255 Building a simple promise***********

//constructor will take exactly one parameter which is EXECUTOR FUNCTION and
// in executor function, it takes 2 arguments 1. resolve 2. reject)
const lotteryPromise = new Promise(function(resolve, reject) {
    console.log(`Lottery draw is happening`);
    setTimeout(function(){
        if(Math.random() >= 0.5){
            //fulfill case
            resolve('You WIN')
        }else{
            //reject case
            reject(new Error('You lost')); //creating an error object
        }
    },2000)
});

lotteryPromise.then(res => console.log(res))
              .catch(err => console.log(err));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Promisifying setTimeout
//A function returns a promise, it is what a fetch does
const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds * 1000);
    })
};

//consume the promise
wait(2).then(() => {
    console.log(`i waited for 2 seconds`)
    return wait(1);
}).then(() =>{
    console.log(`I waited for 1 second`)
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating a fulfilled Promise (the easy way)
//resolve is a static method on the Promise constructor
Promise.resolve(`abc`).then(x => console.log(x))
//Reject Promise
Promise.reject(`abc`).then(x => console.error(x))