'use strict';

//========================================================================================================
//Section11 - 158 The findIndex Method
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
  const displayMovements = function(account){
      containerMovements.innerHTML = '';
      
      account.movements.forEach(function(mov, index){
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

  
//--------------------------------------------------------------------------------------------------------------
//---------------------------------------End of added functionalities-------------------------------------------
//--------------------------------------------------------------------------------------------------------------


