'use strict';

//========================================================================================================
//Section14 - 220 Encapsulation
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
    }

    withdraw(val){
        this.deposit(-val);
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
// 220 Encapsulation: Protected Properties and Methods
// using a underscore prefix to private a varaible is only a convention
// e.g.
// this._pin = pin;
//
// https://stackoverflow.com/questions/4484424/underscore-prefix-for-property-and-method-names-in-javascript
//--------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------
// 221 Encapsulation: Private Class Fields and Methods
//
//only at stage3 of JS updates proposals,
//Not fully compatible with all browsers:
// 1) public field
// 2) private field
// 3) public methods
// 4) private methods
//--------------------------------------------------------------------------------------------------------------

// console.log(acc1.#movements); // Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class
// console.log(acc1.#pin); // Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class
// console.log(acc1.#approveLoan(100)); // Uncaught SyntaxError: Private field '#approveLoan' must be declared in an enclosing class

