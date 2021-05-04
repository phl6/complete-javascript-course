'use strict';

//========================================================================================================
//Section11 - 151 Coding Challenge#2
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
  
  // Ch.145 ****Creating DOM Element*****
  const displayMovements = function(movement){
      containerMovements.innerHTML = '';
      
      movements.forEach(function(mov, index){
          //2 types of movements: DEPOSIT or WITHDRAWAL
          const type = mov > 0 ? `deposit` : `withdrawal`;
  
          const html = `       
           <div class="movements__row">
              <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
              // <div class="movements__date">3 days ago</div>
              <div class="movements__value">${mov}€</div>
           </div>
           `;
          containerMovements.insertAdjacentHTML('afterbegin', html);
      });
  };

  // 148 Computing Usernames
  // e.g. Steven Thomas Williams -> stw
  const createUsernames = function(accs) {
      accs.forEach(function(acc){
          acc.username = acc.owner //creates a new variable (username) in each account object with format
          .toLowerCase()
          .split(' ')
          .map(name => name[0])
          .join('');
      });
  } 
  
//   createUsernames(accounts);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages 
and calculate the average age of the dogs in their study.
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'),
and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
   If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

const dogAgeArr1 = [5, 2, 4, 1, 15, 8, 3];
const dogAgeArr2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function(arr){
    const humanAge = arr.map((dogAge) => (dogAge <= 2) ? 2 * dogAge : 16 + dogAge * 4); //[36, 4, 32, 2, 76, 48, 28]
    const adults = humanAge.filter((age) => age >= 18); //[36, 32, 76, 48, 28]
    const average = adults.reduce((accum, age) => accum += age/adults.length ,0);
    return average;
};

const avg1 = calcAverageHumanAge(dogAgeArr1);
const avg2 = calcAverageHumanAge(dogAgeArr2);

console.log(avg1, avg2); //44 47.333333333333336


