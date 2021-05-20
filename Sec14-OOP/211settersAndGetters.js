'use strict';

//========================================================================================================
//Section14 - 210 ES6 Classes
//========================================================================================================

//--------------------------------------------------------------------------------------------------------------
// 210 ES6 Classes
//
// 1. Classes are NOT hoisted
// 2. Class are first-class citizen
// 3. Classes are executed in strict mode
//--------------------------------------------------------------------------------------------------------------
// Class Expression
// const PersonCl = class {

// }

// Class Declaration
class PersonCl {
    constructor(fullname, birthYear){
        this.fullname = fullname;
        this.birthYear = birthYear;
    }

    //Methods will be added to .prototype property
    calcAge(){
        console.log(2037 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.firstName}`);
    }

    get age(){
        return 2037 - this.birthYear;
    }

    //***set a property that already exists -> append _ to the declared variable and create a new variable
    set fullname(name){
        if(name.includes(' ')) this._fullname = name;
        else alert(`${name} is not a full name.`)
    }

    get fullname(){
        return this._fullname;
    }

};

//--------------------------------------------------------------------------------------------------------------
// 211 Setters and Getters
//--------------------------------------------------------------------------------------------------------------
const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 330],

    get latest(){
        return this.movements.slice(-1).pop();
    },

    set latest(mov){
        this.movements.push(mov);
    },

}

console.log(account.latest); //330
account.latest = 50;
console.log(account.latest); //50

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age); //41
console.log(jessica.fullname); //Jessica Davis

const walter = new PersonCl('Walter Disney', 1965);
