'use strict';

//========================================================================================================
//Section11 - 164 Array Method Practice
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
  
//--------------------------------------------------------------------------------------------------------------
//---------------------------------------Start of added functionalities-----------------------------------------
//--------------------------------------------------------------------------------------------------------------

  // Ch.145 ****Creating DOM Element*****
  const displayMovements = function(account, sort = false){
      containerMovements.innerHTML = '';
    
    //Ch161 sorting functionality
    const movs = sort ? account.movements.slice().sort((a,b) => a - b) : account.movements;

      movs.forEach(function(mov, index){
          //2 types of movements: DEPOSIT or WITHDRAWAL
          const type = mov > 0 ? `deposit` : `withdrawal`;
  
          const html = `       
           <div class="movements__row">
              <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
              <div class="movements__date">3 days ago</div>
              <div class="movements__value">${mov}€</div>
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
    labelBalance.textContent = `${acc.balance}€`;
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
    labelSumIn.textContent = `${deposit}€`;
    labelSumOut.textContent = `${ Math.abs(withdrawal)}€`;;
    labelSumInterest.textContent = `${interest}€`;
    
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
    const amount = Number(inputLoanAmount.value);

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
//Ch164 Array Method Practice
//--------------------------------------------------------------------------------------------------------------

//Ex1 - Sum all positive movements in all accounts
const backDepositSum = accounts.map(acc => acc.movements).flat().filter(mov => mov > 0).reduce((accum, mov) => accum += mov, 0);
console.log(backDepositSum); //25180

//Ex2 - number of deposit in all accounts that is > 1000
// p.s. using reduce() to return the counter
const numDeposits1000_1 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length; //first way of doing
const numDeposits1000_2 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => cur >= 1000 ? ++count : count, 0); //secund way of doing
console.log(numDeposits1000_1); //6 
console.log(numDeposits1000_2); //6

//count++ vs ++count
//prefix vs postfix increment
let a = 10;
console.log(a++); //10
console.log(a); //11

let b = 20;
console.log(++b); //21

//Ex3 - return an object of both sum of deposit and sum of withdrawal
//Create a new object instead of a string
const sums= accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
    cur > 0 ? sums.deposit += cur : sums.withdrawal += cur;
    return sums;  //return reduce method explicitly
}, {deposit:0, withdrawal:0});

console.log(sums); //{deposit: 25180, withdrawal: -7340}

//same as above
const {deposit, withdrawal}= accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
    sums[cur > 0 ? 'deposit' : 'withdrawal'] += cur;
    return sums;  
}, {deposit:0, withdrawal:0});

console.log(deposit, withdrawal); //25180 -7340

//Ex4 - return a string with title case while word in exception array won't be title-cased
//this is a nice title -> This Is a Nice Title
const convertTitleCase = function(title){
    const capitalize = str => str[0].toUpperCase() + str.slice(1);

    const exceptions = ['a','an','the','but','or','on','in','with'];

    const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ');
    return titleCase;

}

console.log(convertTitleCase('this is a nice title')); //This Is a Nice Title
console.log(convertTitleCase('this is a LONG title but n ot too long')); //This Is a Long Title but N Ot Too Long
console.log(convertTitleCase('and there is another title with an EXAMPLE')); //And There Is Another Title with an Example


