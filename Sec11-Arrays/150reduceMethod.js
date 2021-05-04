'use strict';

//========================================================================================================
//Section11 - 150 Reduce()
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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////
// 150 Reduce()
///////////////////////////////////////


//--------------------------------------------------------------------------------------------------------------
//Map()
// -**returns a new array** containing the results of applying an operation on all original array elements
//--------------------------------------------------------------------------------------------------------------
const eurToUsd = 1.1;

// normal callback function
// const movementsUsd = movements.map((mov) => {
//     return mov * eurToUsd;
// });

// arrow function
const movementsUsd = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUsd); //[220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]


//map is the same as using for of loop as below:
const movementsUSDforOfLoop = [];
for(const mov of movements){
    movementsUSDforOfLoop.push(mov * eurToUsd);
};
// console.log(movementsUSDforOfLoop);

// ***map with INDEX
// const movementsDescriptions = movements.map((mov, i, arr) => {
//     if(mov > 0){
//         return `Movement ${i+1}: You deposited ${mov}`;
//     }else{
//         return `Movement ${i+1}: You withdrew ${Math.abs(mov)}`;
//     }
// }
// );

// ***map with INDEX and arrow function
const movementsDescriptions = movements.map((mov, i, ) => `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`);

console.log(movementsDescriptions);
// ["Movement 1: You deposited 200", 
// "Movement 2: You deposited 450",
//  "Movement 3: You withdrew 400", 
//  "Movement 4: You deposited 3000", 
//  "Movement 5: You withdrew 650",
//   "Movement 6: You withdrew 130", 
//   "Movement 7: You deposited 70", 
//   "Movement 8: You deposited 1300"]



//--------------------------------------------------------------------------------------------------------------
//filter()
// -returns a new array** containing the array elements that passed a specified **test condition**
//
// only returns the element to the new array that fulfills the conidtion (condition = true)
//--------------------------------------------------------------------------------------------------------------

const deposit = movements.filter(mov => mov > 0);
console.log(deposit); //[200, 450, 3000, 70, 1300]

// the same as:
const depositForOfLoop = [];
for(const mov of movements) if (mov>0) depositForOfLoop.push(mov);


const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); //[-400, -650, -130]


//--------------------------------------------------------------------------------------------------------------
//reduce（）
//　-boils("reduces") all array elements down to one single value 
//　(e.g. adding all elements tgt)
//--------------------------------------------------------------------------------------------------------------

