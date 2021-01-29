"use strict"

const jonas = {
    firstName: 'Jonas',
    year:1991,
    calcAge: function(){
        console.log(this);
        console.log(2037 - this.year);  //46

        //SOLUTION 1: USING SELF
        // const self = this;  //self or that
        // const isMillenial = function(){
        //     console.log(self);
        //     console.log(self.year >= 1981 && self.year <= 1996);
        // }

        //SOLUTION 2: USING ARROW FUNCTION
        const isMillenial = () => {
            console.log(this);
            console.log(this.year >= 1981 && this.year <= 1996);
        };

        isMillenial();
    },

    greet: () => console.log(`Hey ${this.firstName}`),
    greet2: function() {  //better practice
        console.log(`Hey ${this.firstName}`)
    },
};

jonas.greet(); //undefined, since arrow function doesn't support this keyword, therefore it looks to its parent, which is Window here
console.log(this.firstName);  //undefined
jonas.greet2(); //better practice to use normal function

jonas.calcAge();



//arguments keyword only exists in normal function, not arrow function
const addExpr = function(a,b){
    console.log(arguments);
    return a + b;
};

addExpr(2,5);
addExpr(2,5, 8 ,1, 12,32);

var addArrow = (a,b) => {
    console.log(arguments);
    return a + b;
};

addArrow(2,5,7); //error