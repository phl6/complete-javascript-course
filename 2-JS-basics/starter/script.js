// let js = 'amazing';
// console.log(40 + 8 /4);

// console.log('Jonas');

// let firstName = 'Jonas';
// console.log(firstName);

//Chapter12-Data Types
// let jsIsFun = true;
// console.log(jsIsFun);
// console.log(typeof jsIsFun);

// jsIsFun = 123;
// console.log(typeof jsIsFun);

// jsIsFun = "abcs";
// console.log(typeof jsIsFun);

// let year = 2020;
// console.log(typeof year); //return number
// year = null;
// console.log(typeof year); //return object
//----------------------------------------------------------------------------------------------------
//Chapter13-let,conost,var
//use `let` to declare variable that can be changed later
// let age = 30;
// age = 31;

//`var` is legacy code, should avoid using

//use `const` to delcare variable that are not supposed to change in the future
// const birthYear = 1991;
//birthYear = 1990; //won't work 
//const job; //not legal, can't be null, must have a initial value

//let is block scoped
//var is function scoped
//----------------------------------------------------------------------------------------------------
//Chapter14-Basic Operators
// const now = 2047
// const ageJon = now - 1997;
// const ageSarah = now - 1999;
// console.log(ageJon, ageSarah);
// console.log(ageJon/2, ageJon*2);
// console.log(106**3); //2 to the power of 3

// const firstName = 'Jon';
// const lastName = 'Upper';
// console.log(firstName + ' ' + lastName);

// + is processed before =, operator precedence
// let x = 10 + 5;
// console.log(x); //15
// x += 10;
// console.log(x); //25
// x++;
// x--;

//comparison operators
// console.log(ageJon > ageSarah); // >, <, >=, <=
// console.log(ageSarah >= 18);

// const isFullAge = ageSarah >=18;
// console.log(isFullAge);

// console.log(now-1991 > now -1990);
//----------------------------------------------------------------------------------------------------
//Chapter15-Operator Precedence
// let x, y;
// x = y = 25-10-5;
// console.log(x, y);
//----------------------------------------------------------------------------------------------------
//Coding Challenge
//----------------------------------------------------------------------------------------------------
//Chapter17-Strings and template literals
// const firstName = 'Jon';
// const job = 'teacher';
// const year = 2048;
// const birthYear = 1991;

// const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' teacher.';
// console.log(jonas);

// //***ES6 feature, without using single or double quote, instead using backticks and placeholders as follow
// const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}`;
// console.log(jonasNew);

// console.log('(Legacy) String with \n\
// multiple line \n\
// lines');

// console.log(`ES6
// muliple lines
// is better`);
//----------------------------------------------------------------------------------------------------
//Chapter18-if/else statement
// const age = 15;
// const isOldEnough = age >= 18;

// if(age >= 18){
//     console.log('Driving license');
// }else{
//     const yearsLeft = 18 - age;
//     console.log(`Wait another ${yearsLeft} years...`);
// }

// let century;
// const birthYear = 1991;
// if(birthYear <= 2000){
//      century = 20;
// }else{
//      century = 21;
// }

// console.log(century);
//----------------------------------------------------------------------------------------------------
//Chapter20-Type Conversion and Coercion

//type conversion
// const inputYear = '1991';
// console.log(inputYear + 18); //return 199118
// console.log(Number(inputYear) + 18); //type conversion, return 2009

// console.log(Number('Jonas')); //return NaN, invalid number
// console.log(typeof NaN); //it return type of number, so NaN is also a number

// console.log(String(23)); //return '23'
// console.log(typeof String(23)); //return string type
// console.log(String(23), 23); //string, number of 23

// //type coercion
// console.log('I am ' + 23 + ' years old'); //string + (number -> coercion to string) + string, only plus operator don't do operator coercion
// console.log('23' - '10' - 3); //return 10, minus operator triggered and convert string to number
// console.log('23' * '2'); //return number 46
// console.log('23' > '18'); //return boolean true

// let n = '1' + 1;
// n = n - 1;
// console.log(n); //return 10, 1. '1' + 1 -> 11, 11 - 1 -> 10
//----------------------------------------------------------------------------------------------------
//Chapter21-Equality Operators: ==(loose equality operator) vs ===(strict equality operator)
// const age = 18;

// //always use === for good practice of code
// if(age === 18) console.log('You just became an adult (strict)'); //strict equality operator, return true only if both side equals to true
// //18 === 18 -> true
// //18 === 19 -> false
// //'18' == 18 -> true
// //'18' === 18 -> false
// if(age == 18) console.log('You just became an adult (loose)'); //loose equality operator

// const favNumber = prompt("What is your fav number?");
// console.log(`Your Favourite number is ${favNumber}`);
// console.log(typeof favNumber); //return string

// if(favNumber == 23) console.log('23 is a great number -- loose'); //'23' == 23, loose equality operator
// if(favNumber === 23) console.log('23 is a great number -- strict'); //won't return '23 is a great number', since using strict equality operator

// const leastFavNumber = Number(prompt("What is your least fav number?"));
// console.log(leastFavNumber);
// console.log(typeof leastFavNumber); //return string
// if(leastFavNumber == 7) console.log('7 is not a great number -- loose'); //'7' == 7, return the string , loose equality operator
// if(leastFavNumber === 7) console.log('7 is not a great number -- strict'); //also return '3 is not a great number', since using strict equality operator

//----------------------------------------------------------------------------------------------------
//Chapter22-Boolean Logic (AND, OR, NOT)
//SKIPPED 

//----------------------------------------------------------------------------------------------------
//Chapter23-Logical Operators
// const hasDriversLicense = true; //A
// const hasGoodVision = true; //B

// console.log(hasDriversLicense && hasGoodVision); //true
// console.log(hasDriversLicense || hasGoodVision); //true
// console.log(!hasDriversLicense); //False

//----------------------------------------------------------------------------------------------------
//Chapter24-Swtich Statements
// const day = 'monday';

// switch(day){
//     case 'monday':
//         console.log('M');
//         break;
//     case 'tuesaday':
//         console.log('T');
//         break;
//     default:
//         console.log('other day');
//         break;
// }

//----------------------------------------------------------------------------------------------------
//Chapter25-Statements and Expressions
//theory

//----------------------------------------------------------------------------------------------------
//Chapter28-The Conditional(Tenery) Operators
// const age = 23;
// age >= 18 ? console.log('I can drink alcoholic drinks now') :　console.log(`I can't drink alchohol`);

// console.log(`I like to drink ${age >= 18 ? `drink wine` : `drink water`}`);

