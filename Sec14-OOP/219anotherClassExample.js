'use strict';

//========================================================================================================
//Section14 - 219 Another Class Example
//========================================================================================================
class Account{
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account ${owner}`);
    }

    //Public Interface of the object
    deposit(val){
        this.movements.push(val);
    }

    withdraw(val){
        this.deposit(-val);
    }

    aprroveLoan(val){
        //logic
        return true;
    }

    requestLoan(val){
        if(this.approveLoan(val)){
            this.deposit(val);
            console.log(`Loan Approved`);
        }
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(-140);
// acc1.approveLoan(2000); //should hide from public (data encapsulation)
acc1.requestLoan(2000);


console.log(acc1);
// console.log(acc1.pin); //should hide from public (data encapsulation)

