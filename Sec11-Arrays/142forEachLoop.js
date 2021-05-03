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

/////////////////////////////////////////////////
// 141 For Each Loop

// When to use FOR EACH and When to use FOR OF ?

// ***continue*** and ***break*** statements can't be used with FOR EACH LOOP
// FOR EACH will always loop through the entire array

// other than that it's just personal preference

/////////////////////////////////////////////////

//--------------------------------------------------------------------------------------------------------------
//for of loop
//--------------------------------------------------------------------------------------------------------------
console.log('-----FOR OF-----');
for(const movement of movements){
    if(movement > 0){
        console.log(`You deposited ${movement}`);
    }else{
        console.log(`You withdrew ${Math.abs(movement)}`);
    }
}
//Result:
// You deposited 200
// You deposited 450
// You withdrew 400
// You deposited 3000
// You withdrew 650
// You withdrew 130
// You deposited 70
// You deposited 1300

console.log('-----ACCESSING COUNTER VARIABLE of FOR OF LOOP-----');
for(const [i, movement] of movements.entries()){
    if(movement > 0){
        console.log(`Movement ${i+1}: You deposited ${movement}`);
    }else{
        console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
    }
}

// Movement 1: You deposited 200
// Movement 2: You deposited 450
// Movement 3: You withdrew 400
// Movement 4: You deposited 3000
// Movement 5: You withdrew 650
// Movement 6: You withdrew 130
// Movement 7: You deposited 70
// Movement 8: You deposited 1300

//--------------------------------------------------------------------------------------------------------------
//for each loop
//requires callback function
//--------------------------------------------------------------------------------------------------------------
console.log('-----FOR EACH-----');
//same result as above
movements.forEach(function(movement){
    if(movement > 0){
        console.log(`You deposited ${movement}`);
    }else{
        console.log(`You withdrew ${Math.abs(movement)}`);
    }
});
// How it works
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

console.log('-----ACCESSING COUNTER VARIABLE of FOR EACH LOOP-----');
//In order to use the callback function
//***first param should always be the current element
//***second param should always be the current index
//***third param should always be the entire array that we are looping over

movements.forEach(function(mov, i, arr){
    if(mov > 0){
        console.log(`Movement ${i+1}: You deposited ${mov}`);
    }else{
        console.log(`Movement ${i+1}: You withdrew ${Math.abs(mov)}`);
    }
});

