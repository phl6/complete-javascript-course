// `use strict`

//CH.95 HOISTING AND TDZ
//========================================================================================================
// Variables
// console.log(me);  //undefined
// console.log(job);   //error
// console.log(year);  //won't be shown 

var me = 'Jonas';
let job = 'teacher';
const year = 1991;
//========================================================================================================
// Functions
// console.log(addDecl(2,3)); //return 5
// console.log(addExpr(2,3)); //reference error
// console.log(addArrow(2,3)); //reference error


//function declaration 
function addDecl(a, b){
    return a + b;
}

//function expression
const addExpr = function(a,b){
    return a + b;
};

//arrow function
const addArrow = (a,b) => a + b;

//--------------------------------------------------------------------------------------------------------
//Example!!!
console.log(numProducts); //undefined
if(!numProducts) deleteShoppingCart(); //since undefined is also falsy value, so the message will be shown here

var numProducts = 10;

function deleteShoppingCart(){
    console.log('All products deleted');
}

//--------------------------------------------------------------------------------------------------------
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); //true
console.log(y === window.y); //false
console.log(z === window.z); //false

//========================================================================================================
