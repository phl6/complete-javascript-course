'use strict';

//========================================================================================================
//Section11 - 141 SimpleArrayMethod
//========================================================================================================

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//--------------------------------------------------------------------------------------------------------------
//slice()
//doesn't mutate the array
//--------------------------------------------------------------------------------------------------------------
let arr = ['a', 'b', 'c', 'd', 'e'];

//return element from 2nd position to end
console.log(arr.slice(2)); //["c", "d", "e"]

//return position 2-3 elements, note that 4th position element won't be returned
console.log(arr.slice(2,4)); //["c", "d"]

//return last element of the array
console.log(arr.slice(-1)); //["e"]

//return last 2 elements of the array
console.log(arr.slice(-2)); //["d","e"]

//return 1st to last 3 elements
console.log(arr.slice(1, -2)); //["b", "c"]

// arr.slice() vs [...arr] to create shallow copy
// they are the same, just personal preference
console.log(arr.slice()); //["a", "b", "c", "d", "e"]
console.log([...arr]);    //["a", "b", "c", "d", "e"]

//--------------------------------------------------------------------------------------------------------------
//splice()
//very similar to slice(), but splice instead "will mutate the array"
//--------------------------------------------------------------------------------------------------------------
console.log(arr.splice(2)); //["c", "d", "e"]
console.log(arr); //["a","b"]

//*** Commonly used
//***remove the last element of an array
arr.splice(-1);
console.log(arr); //["a"]

//--------------------------------------------------------------------------------------------------------------
//reverse()
//mutates the original array
//--------------------------------------------------------------------------------------------------------------
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //["f", "g", "h", "i", "j"]
console.log(arr2); //["f", "g", "h", "i", "j"], original array has been mutated

//--------------------------------------------------------------------------------------------------------------
//concat()
//--------------------------------------------------------------------------------------------------------------
const letters = arr.concat(arr2);
//approach1
console.log(letters); //["a", "f", "g", "h", "i", "j"]

//approach2
console.log([...arr, ...arr2]); //["a", "f", "g", "h", "i", "j"]

//--------------------------------------------------------------------------------------------------------------
//join()
//doesn't mutate the original array
//--------------------------------------------------------------------------------------------------------------
console.log(letters.join(' - ')); // a - f - g - h - i - j



