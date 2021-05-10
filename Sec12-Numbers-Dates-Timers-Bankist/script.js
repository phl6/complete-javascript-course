'use strict';

//========================================================================================================
//Sec12 - Numbers - Dates - Timers (Lectures)
//========================================================================================================

// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-05-03T14:11:59.604Z',
    '2021-05-08T17:01:17.194Z',
    '2021-05-09T10:36:17.929Z',
    '2021-05-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2020-11-01T13:15:33.035Z',
    '2020-11-30T09:48:16.867Z',
    '2020-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2021-06-25T18:49:59.371Z',
    '2021-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];
  
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
  
//--------------------------------------------------------------------------------------------------------------
//---------------------------------------Start of added functionalities-----------------------------------------
//--------------------------------------------------------------------------------------------------------------
const formatMovementDate = function(date){
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} days ago`;
  
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  console.log(`${day}/${month}/${year}`);
  return `${day}/${month}/${year}`;
  
};

  // Ch.145 ****Creating DOM Element*****
  const displayMovements = function(account, sort = false){
      containerMovements.innerHTML = '';
    
    //Ch161 sorting functionality
    const movs = sort ? account.movements.slice().sort((a,b) => a - b) : account.movements;

      movs.forEach(function(mov, index){
          //2 types of movements: DEPOSIT or WITHDRAWAL
          const type = mov > 0 ? `deposit` : `withdrawal`;

          const date = new Date(account.movementsDates[index]);
          const displayDate = formatMovementDate(date);

          const html = `       
           <div class="movements__row">
              <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
              <div class="movements__date">${displayDate}</div>
              <div class="movements__value">${mov.toFixed(2)}€</div>
           </div>
           `;
          containerMovements.insertAdjacentHTML('afterbegin', html);
      });
  };
    //Ch161 sorting functionality
    //universal variable that record the state of sorting
    let sorted = false;
    
    btnSort.addEventListener('click', function(e){
      e.preventDefault();
      displayMovements(currentAccount, !sorted); //when click turn the sorted to true
      sorted = !sorted; //then toggle sorted back to false
      console.log('sort');
    });

  const createUsernames = function(accs) {
    accs.forEach(function(acc){
        acc.username = acc.owner //creates a new variable (username) in each account object with format
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
    });
  } 

  createUsernames(accounts); //generate usernames for each account

  const calcBalance = function(acc){
    acc.balance = acc.movements.reduce((accum, mov) => accum += mov, 0);
    labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  }

  const calcDisplaySummary = function(acc){
    const deposit = acc.movements.filter(mov => mov > 0).reduce((accum, mov) => accum += mov, 0);
    const withdrawal = acc.movements.filter(mov => mov < 0).reduce((accum, mov) => accum += mov, 0);
    const interest = acc.movements.filter(int => int > 0)
                                      .map(deposit => (deposit*acc.interestRate)/100)
                                      .filter(int => int >= 1) //filter out interest that is less than 1
                                      .reduce((accum,int) => accum + int ,0);
    const summary = deposit - withdrawal + interest;

    //display summary
    labelSumIn.textContent = `${deposit.toFixed(2)}€`;
    labelSumOut.textContent = `${ Math.abs(withdrawal).toFixed(2)}€`;;
    labelSumInterest.textContent = `${interest.toFixed(2)}€`;
    
  }

  const updateUI = function(acc){
    //Display movements
    displayMovements(acc);

    //Display summary
    calcDisplaySummary(acc);
    
    //Display balance
    calcBalance(acc);
  }
  
//--------------------------------------------------------------------------------------------------------------
//Ch156 - Implementing Login
//--------------------------------------------------------------------------------------------------------------
  let currentAccount = "";

  //Event Handlers
  btnLogin.addEventListener('click', function(event){
    //Prevent form from default submission
    event.preventDefault();

    //check username exists
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

    //check password
    if (currentAccount?.pin === Number(inputLoginPin.value) ){ 
        //Display UI and welcome message after login
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}!`;
        containerApp.style.opacity = 100;

        //Clear input fields
        inputLoginUsername.value = '';
        inputLoginPin.value = '';
        inputLoginPin.blur();

        updateUI(currentAccount);
    
        }else{
            containerApp.style.opacity = 0;
        }
  });

  
//--------------------------------------------------------------------------------------------------------------
//Ch157 - Implementing Transfer
//--------------------------------------------------------------------------------------------------------------
    // const inputTransferTo = document.querySelector('.form__input--to');
    // const inputTransferAmount = document.querySelector('.form__input--amount');
    // btnTransfer

    btnTransfer.addEventListener('click', function(event){
        event.preventDefault();
        const receiveAccount = accounts.find(acc => acc.username === inputTransferTo.value);
        const amount = Number(inputTransferAmount.value);

        //reset fields to empty
        inputTransferTo.value = inputTransferAmount.value = '';

        if(receiveAccount 
           && amount > 0
           && currentAccount.balance >= amount 
           && receiveAccount?.username !== currentAccount.username){

            //Add negative movement to current user
            currentAccount.movements.push(-Math.abs(amount));

            //Add positive movement to recipient
            receiveAccount.movements.push(Math.abs(amount));

            updateUI(currentAccount);

            console.log(`-----------From ${currentAccount.owner}-----------`);
            console.log(currentAccount.movements);
            console.log(`-----------To ${receiveAccount.owner}-----------`);
            console.log(receiveAccount.movements);
           }
    });

//--------------------------------------------------------------------------------------------------------------
//Ch158 - The findIndex Method (Implementing Close Account functionality)
//--------------------------------------------------------------------------------------------------------------
btnClose.addEventListener('click', function(event){
    event.preventDefault();
    const closeUserName = inputCloseUsername.value;
    const closePin = Number(inputClosePin.value);
    
    //reset fields
    inputCloseUsername.value = inputClosePin.value = '';

    //check correct credentials
    if(closeUserName === currentAccount.username && closePin === currentAccount.pin ){
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        //delete account
        accounts.splice(index, 1);
        //log user out
        containerApp.style.opacity = 0;
    }
});

////Ch159 The some and every method (Loan Functionality
btnLoan.addEventListener('click', function(event){
    event.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
        //Add movement
        currentAccount.movements.push(Math.abs(amount));

        updateUI(currentAccount);
    }

    inputLoanAmount.value = '';
});

//--------------------------------------------------------------------------------------------------------------
//---------------------------------------End of added functionalities-------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------
//168 Converting and Checking Numbers
//--------------------------------------------------------------------------------------------------------------
console.log(23 === 23.0); //true

// Base 10 - 0 to 90 1/10 = 0.1. 3/10 = 3.33333333
// Binary base 2 - 0 1
console.log(0.1+0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); //false

//Conversion
console.log(Number(23)); //23
console.log(+'23'); //auto type conversion by JS, return 23

//Parsing
// Must starts with numbers
console.log(Number.parseInt('30px')); //30
console.log(Number.parseInt('x29')); //NaN
console.log(Number.parseInt('30px', 10)); //30
console.log(Number.parseInt('x29', 10)); //NaN

console.log(Number.parseInt(' 2.5rem ')); //2
console.log(Number.parseFloat(' 2.5rem ')); //2.5

//Is Not a Number Checking
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN(+'20X')); //true
console.log(Number.isNaN(23 / 0)); //false

//isFinite()
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false

//--------------------------------------------------------------------------------------------------------------
//169 Math and Rounding
//--------------------------------------------------------------------------------------------------------------
//Square Root or Cubic Root
console.log(Math.sqrt(25)); //5
console.log(25 ** (1/2)); //5
console.log(8 ** (1/3)); //2

//Find Max Min
console.log(Math.max(2, 18, 23, 11, 2)); //23
console.log(Math.max(2, 18, '23', 11, 2)); //23
console.log(Math.max(2, 18, '23px', 11, 2)); //NaN

console.log(Math.PI * Number.parseFloat('10px') **2 ); //314.1592653589793

//Generate Number
console.log(Math.trunc(Math.random() * 6) + 1); //random number from 1 to 6
const randomInt = (min, max) => Math.trunc(Math.random() * (max-min) + 1) + min;  
//Reason why of (max-min) and add min at the end, becoz 0...1 -> 0...(max-min) -> min...max
console.log(randomInt(1,6));

//Rounding
console.log(Math.trunc(23.333)); //23
console.log(Math.round(23.9)); // 24 //round -> always round to nearest Integer

console.log(Math.ceil(23.3)); //24 //round up
console.log(Math.ceil(23.9)); //24 //round up

console.log(Math.floor(23.3)); //23 //round down
console.log(Math.floor('23.9')); //23 //round down //also type conversion

//Rounding decimals
console.log((2.7).toFixed(0)); //3
console.log((2.7).toFixed(3)); //2.700
console.log((2.345).toFixed(2)); //2.35
console.log(+(2.345).toFixed(2)); //2.35

//--------------------------------------------------------------------------------------------------------------
//172 Creating Dates
//--------------------------------------------------------------------------------------------------------------
//Create a date
const now = new Date();
console.log(now); //Mon May 10 2021 16:05:07 GMT+0800 (香港標準時間)

console.log(new Date('Mon May 10 2021 16:04:33')); //Mon May 10 2021 16:04:33 GMT+0800 (香港標準時間)
console.log(new Date('December 24, 2015')); //Thu Dec 24 2015 00:00:00 GMT+0800 (香港標準時間) //not recommeded
console.log(new Date(account1.movementsDates[0])); //Tue Nov 19 2019 05:31:17 GMT+0800 (香港標準時間)

//month in js is 0-based, so 10 = NOV
console.log(new Date(2047, 10, 19, 15, 23, 5)); //Tue Nov 19 2047 15:23:05 GMT+0800 (香港標準時間) 
console.log(new Date(2037, 10, 31));

console.log(new Date(0)); //Thu Jan 01 1970 08:00:00 GMT+0800 (香港標準時間)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //Sun Jan 04 1970 08:00:00 GMT+0800 (香港標準時間)  //3 DAYS LATER 

//Working with dates
const future = new Date(2047, 10, 19, 15, 23, 5);
console.log(future);
console.log(future.getFullYear()); //2047
console.log(future.getMonth());  //10
console.log(future.getDay()); //2
console.log(future.getHours()); //15
console.log(future.getMinutes()); //23
console.log(future.getSeconds()); //5

//International Date
console.log(future.toISOString()); //2047-11-19T07:23:05.000Z 

//get current timestamp
console.log(Date.now());

future.setFullYear(2040);
console.log(future); //Mon Nov 19 2040 15:23:05 GMT+0800 (香港標準時間)


//--------------------------------------------------------------------------------------------------------------
//173 Operations with Dates
//--------------------------------------------------------------------------------------------------------------
const future2 = new Date(2037, 10, 19, 15, 23, 5);
console.log(+future2); //2142228185000

// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const day1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
// console.log(day1); //10


