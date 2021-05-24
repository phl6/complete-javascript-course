'use strict';

//========================================================================================================
//Section14 - 213 Object Create
//          - 215 Inheritance Between "Classes" : Constructor Function
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

    //INSTANCE Methods
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

    //(ch212) STATIC Method
    static hey(){
        console.log('Hey there');
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

const jessica = new PersonCl('Jessica Davis', 1996);
const walter = new PersonCl('Walter Disney', 1965);

//--------------------------------------------------------------------------------------------------------------
// 212 Static Methods
//--------------------------------------------------------------------------------------------------------------
PersonCl.hey();

//--------------------------------------------------------------------------------------------------------------
// 213 Object Create
//--------------------------------------------------------------------------------------------------------------

// //Different way of creating an object 
// const PersonProto = {
//     calcAge(){
//         console.log(2037 - this.birthYear);
//     },

//     init(firstName, birthYear){
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };

// //personProto 1
// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge(); //35

// console.log(steven.__proto__);

// //personProto 2
// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge(); //58

//--------------------------------------------------------------------------------------------------------------
// 215 Inheritance Between "Classes" : Constructor Function
//--------------------------------------------------------------------------------------------------------------
const Person = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
};

//methods setting 
Person.prototype.calcAge = function(){
    console.log(2037-this.birthYear);
};

const Student = function(firstName, birthYear, course){
    Person.call(this, firstName, birthYear);
    this.course = course;
};

//Linking Prototype
Student.prototype = Object.create(Person.prototype);

//this won't work
// Student.prototype = Person.prototype;

Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce(); //My name is Mike and I study Computer Science
mike.calcAge(); //17, use the prototype method in the parent class

console.log(mike.__proto__); //Person {introduce: ƒ}
console.log(mike.__proto__.__proto__);

//Prototype Chain
console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true
console.log(mike instanceof Object); //true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

//--------------------------------------------------------------------------------------------------------------
// 215 Inheritance Between "Classes" : ES6 Classes
//--------------------------------------------------------------------------------------------------------------
class StudentCl extends PersonCl{
    constructor(fullname, birthYear, course){
        //super always needs to happen first
        super(fullname, birthYear);
        this.course = course;
    }

    introduce(){
        console.log(`My name is ${this.fullname} and I study ${this.course}`);
    }

    calcAge(){
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10} `);
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();


//--------------------------------------------------------------------------------------------------------------
// 215 Inheritance Between "Classes" : Object.create()
//--------------------------------------------------------------------------------------------------------------
//Different way of creating an object 
const PersonProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

//personProto 1
const steven = Object.create(PersonProto);

//PROTOTYPE CHAIN
//PersonProto -> StudentProto -> jay
const StudentProto = Object.create(PersonProto); //student inherits from PersonProto
StudentProto.init = function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

const jay = Object.create(StudentProto); //jay inherits from StudentProto
jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
jay.calcAge(); //27