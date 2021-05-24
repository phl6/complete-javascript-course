'use strict';

//========================================================================================================
//Section14 - 222 Chaining Methods
//========================================================================================================
class Account{
    // 1) Public Fields (instances)
    locale = navigator.language;
    _movements = [];

    // 2) Private Fields
    #movements = [];
    #pin;


    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        //Protected Property
        //this._pin = pin;
        this.#pin = pin;
        // this._movements = []; 
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account ${owner}`);
    }

    getMovements(){
        return this.#movements;
    }

    //Public Interface of the object
    deposit(val){
        this.#movements.push(val);
        return this;
    }

    withdraw(val){
        this.deposit(-val);
        return this;
    }

    //encapsulation
    _approveLoan(val){
        //logic
        return true;
    }

    requestLoan(val){
        if(this._approveLoan(val)){
            this.deposit(val);
            console.log(`Loan Approved`);
            return this;
        }
    }

    // // 4) Private Methods
    // #approveLoan(val){
    //     return true;
    // }

}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
// acc1.approveLoan(2000); //should hide from public (data encapsulation)
acc1.requestLoan(2000);
console.log(acc1.getMovements());


console.log(acc1);
// console.log(acc1.pin); //should hide from public (data encapsulation)


//--------------------------------------------------------------------------------------------------------------
// 222 Chaining Methods
//--------------------------------------------------------------------------------------------------------------
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000); 
console.log(acc1.getMovements()); //[250, -140, 2000, 300, 500, -35, 25000, -4000]