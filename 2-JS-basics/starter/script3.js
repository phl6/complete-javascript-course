`strict`
//SECTION3

//=====================================================================
//34. FUNCTION DECLARATIONS VS. EXPRESSIONS
/*
For function declaration: function can be called before initialization
vs.
For function expression: function must be initialized first to be able to call it
*/
const age1 = calAge1(1997)
// console.log(age1);

//function declaration
function calAge1(birthYear){
    return 2047-birthYear;
}

//function expression
const calAge2 = function (birthYear){
    return 2047-birthYear;
}

const age2 = calAge2(1997);

// console.log(age1, age2);

//=====================================================================
//35. ARROW FUNCTIONS

//very similar to function expression
const calAge3 = birthYear => 2047-birthYear;

const age3 = calAge3(1991);
// console.log(age3);

//ONE PARAMETER
const yearsUntilRetirement = birthYear => {
    const curAge = 2037 - birthYear;
    const retirement = 65 - curAge;
    return retirement;
}

//MULTIPLE PARARMETER
const yearsUntilRetirement2 = (birthYear, firstName) => {
    const curAge = 2037 - birthYear;
    const retirement = 65 - curAge;
    return `${firstName} retires in ${retirement} years`;
}

// console.log(yearsUntilRetirement(1990)); //1 param
// console.log(yearsUntilRetirement2(1990, 'JONES')); //>1 params

//=====================================================================
//40. INTRO TO ARRAYS

const fd1 = 'Michael';
const fd2 = 'Stephen';
const fd3 = 'Peter';

const fds = ['Michael', 'Stephen', 'Peter'];

// console.log(fds);
// console.log(fds.length);
// console.log(fds[fds.length - 1]);
fds[2] = 'Jay'; //changing content of array
// console.log(fds[2]);


const years = new Array(1991, 1994, 2008, 2020); //another way declaring an array
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, fds]; //array accept different primitive data types
// console.log(jonas);
// console.log(jonas.length);

//=====================================================================
//41. BASIC ARRAY OPERATIONS
 fds.push('okJai');

 const newLength = fds.push('Jay'); //stores the length of the array into a variable after pushing
// console.log(newLength);

 fds.pop() //remove last element of the array
// console.log(fds);
const popped = fds.pop(); //stores the popped element 
// console.log(popped); 


fds.unshift('Jogn'); //push the element to arr[0]
// console.log(fds);

fds.shift();    //pop the arr[0]
// console.log(fds);

// console.log(fds.indexOf('Stephen')); //returns the position of an element

// console.log(fds.includes('Jay')); //returns boolean

//=====================================================================
//42. INTRODUCTION TO OBJECTS

//array declaration
const jonasArray =[
    'Jon', 
    'Li',
    2037-1991,
    'teacher',
    ['Michael', 'Peter', 'Jay']
];

//object declaration
const jonasObj = {
    firstName: 'Jon',
    lastName: 'Li',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Jay'],
    hasDriversLicense: true,

    //object method
    calculateAge: function(birthYear){
        // console.log(this);
        return 2037 - birthYear;
    },

    calculateAge2: function(){
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function(){
        return `${this.firstName} is a ${this.calculateAge2()}-year old ${this.job}, and he ${this.hasDriversLicense ? `has`:`doesn''t have`} a driving license.`;
    }
};

//43. DOT VS BRACKET NOTATION
//accessing content of object, either use . or [] 
// '.' only access the content of the property
// '[]' can access content and do operations or calculations

// console.log(jonasObj.firstName);
 jonasObj.firstName = 'Jonas';
// console.log(jonasObj.firstName);

// console.log(jonasObj['firstName']);

 const nameKey = 'Name';
// console.log(jonasObj['first' + nameKey]);
// console.log(jonasObj['last' + nameKey]);

//utilising BRACKET[]
//const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends.');
// if(jonasObj[interestedIn]){
//     console.log(jonasObj[interestedIn]);    
// }else{
//     console.log('Wrong request.');
// }

//adding a property into jonas OBJECT
jonasObj.location = 'Hong Kong';
jonasObj['twitter'] = '@jonasabc';
// console.log(jonasObj);

//accessing object's array element, return the length of an array 
// console.log(`${jonasObj['firstName']} has ${jonasObj.friends.length} firends, and his best fd is called ${jonasObj.friends[0]}`);

// console.log(jonasObj.calculateAge(2002));
// console.log(jonasObj['calculateAge'](jonasObj['birthYear']));

// console.log(jonasObj.calculateAge2());
// console.log(jonasObj.getSummary());

//=====================================================================
//LOOPS
//47.Looping Arrays, Breaking and Continuing

const jonasArray2 =[
    'Jon', 
    'Li',
    2037-1991,
    'teacher',
    ['Michael', 'Peter', 'Jay']
];

for(let i = 0; i<jonasArray2.length ;i ++){
    console.log(jonasArray2[i], typeof jonasArray2[i]);
}




