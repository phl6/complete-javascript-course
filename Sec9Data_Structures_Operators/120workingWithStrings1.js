"use strict";

//========================================================================================================
//Section9 - 120, 121, 123 - Working With Strings
//========================================================================================================


const airline = 'TAP Air Portugal';
const plane = 'A320';

//--------------------------------------------------------------------------------------------------------
// Return the value from a String's position
//--------------------------------------------------------------------------------------------------------
console.log(plane[0]); // A String type
console.log(plane[1]); // 3 String type
console.log(plane[2]); // 2 String type
console.log(plane[3]); // 0 String type

console.log('B370'[0]); // B

//--------------------------------------------------------------------------------------------------------
// Length
//--------------------------------------------------------------------------------------------------------
console.log(airline.length); // 16
console.log('B370'.length); // 4 

//--------------------------------------------------------------------------------------------------------
// Methods ---- indexof, lastIndexOf, slice, 
//--------------------------------------------------------------------------------------------------------
//(1) indexof() SINGLE CHARACTER (p.s. counting from 0)
console.log(airline.indexOf('T')); // 0
console.log(airline.indexOf('r')); // 6

//(1-1) indexof() WHOLE WORD
console.log(airline.indexOf('Portugal')); // 8 (the word starts from index 8)

//(2) lastIndexOf()
console.log(airline.lastIndexOf('r')); // 10
 
//(3) slice(), equivalent to .subString() in java
console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4,7)); // Air

// (4) combine slice and indexOf

//（4-1） RETURN THE "FIRST WORD"
//by slicing the word from index 0 to the indexOf(' ')
console.log(airline.slice(0, airline.indexOf(' '))); // TAP

//（4-2） RETURN THE "LAST WORD"
//without + 1, it will include the space in front of _Portugal
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Portugal

// (4-3) Extracting FROM THE END
console.log(airline.slice(-2)); //al
console.log(airline.slice(1, -1)); //AP Air Portuga

const checkMiddleSeat = function(seat){
    // B and E are middle seats
    const s = seat.slice(-1);
    if(s === 'B' || s === 'E') console.log('You have got the middle seat');
    else console.log('You are lucky, it is not a middle seat');
}

checkMiddleSeat('11B'); //You have got the middle seat
checkMiddleSeat('23C'); //You are lucky, it is not a middle seat
checkMiddleSeat('3E');  //You have got the middle seat

//--------------------------------------------------------------------------------------------------------
// Changing the Case of a String
//--------------------------------------------------------------------------------------------------------
// All letter in string to either upper or lower case
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix Capitalization in name
const passenger = 'jOnAs';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1); //J + onas
console.log(passengerCorrect);

// Comparing Emails
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.io \n';

const lowerEmail = loginEmail.toLowerCase();

//--------------------------------------------------------------------------------------------------------
// Trimming 
//--------------------------------------------------------------------------------------------------------
//Remove whitespace or \n
const trimEmail = lowerEmail.trim(); 
console.log(trimEmail);  //hello@jonas.io

//Do it just one line
const normalizeEmail = loginEmail.toLowerCase().trim(); //hello@jonas.io
console.log(normalizeEmail);

//--------------------------------------------------------------------------------------------------------
// Replacing
//--------------------------------------------------------------------------------------------------------
const priceGB = '288,97£';
//(0) replace()
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS); //288.97$

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

//(1) Chaining()
console.log(announcement.replace('door', 'gate').replace('door', 'gate')); 
//(2) replaceAll()
console.log(announcement.replaceAll('door', 'gate'));
//(3) Regular Expression ---- /g = global
console.log(announcement.replaceAll(/door/g, 'gate'));

//--------------------------------------------------------------------------------------------------------
// Boolean
//--------------------------------------------------------------------------------------------------------
const plane2 = 'Airbus A320neo';

// (1) includes()
console.log(plane2.includes('A320')); // true
console.log(plane2.includes('Boeing')); // false

// (2) startsWith
console.log(plane2.startsWith('Airb')); // true
console.log(plane2.startsWith('Boeing')); // false

// (3) endsWith()
if(plane2.startsWith('Airbus') && plane2.endsWith('neo')) console.log('part of the new airbus family');


// Practice
const checkBaggage = function(item){
    const baggage = item.toLowerCase();
    if(baggage.includes('knife') || baggage.includes('gun')){
        console.log('You are not allowed on board.');
    }else{
        console.log('Welcome aboard');
    }
};

checkBaggage('I have a laptop, some Food and a pocket knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');


//--------------------------------------------------------------------------------------------------------
// split()
//--------------------------------------------------------------------------------------------------------
console.log('a+very+nice+string'.split('+')); // ["a", "very", "nice", "string"], returns an array
console.log('Louis Li'.split(' ')); // ["Louis", "Li"]

const [firstname, lastname] = 'Louis Li'.split(' ');
console.log(firstname, lastname); // Louis Li
console.log([firstname], [lastname]); // ["Louis"] ["Li"]

//--------------------------------------------------------------------------------------------------------
// join()
//--------------------------------------------------------------------------------------------------------
const newName = ['Mr.', firstname, lastname.toUpperCase()].join(' ');
console.log(newName); // Mr. Louis LI

const capitalizeName = function(name){
    const names = name.toLowerCase().split(' ');
    const namesUpper = [];

    for(const n of names){
        //    namesUpper.push(n[0].toUpperCase() +  n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(namesUpper.join(' '));
}

const passenger1 = 'kObE bRyaNt';
const passenger2 = 'jessica ann smith davis'; 
capitalizeName(passenger1); // Kobe Bryant
capitalizeName(passenger2); // Jessica Ann Smith Davis

//--------------------------------------------------------------------------------------------------------
// padding()
//--------------------------------------------------------------------------------------------------------
const message = 'Go to Gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+')); 
console.log('Louis'.padStart(24, '+').padEnd(35, '+'));

const maskCreditCard = function(number){
    const str = number + '' ;
    const last = str.slice(-4);
    return last.padStart(str.length, '*');

}

console.log(maskCreditCard(4567898765987)); // *********5987
console.log(maskCreditCard('3456789876543456789')); // ***************678

//--------------------------------------------------------------------------------------------------------
// repeat()
//--------------------------------------------------------------------------------------------------------
const repeatMsg1 = 'Bad weather... All departures delayed...';
console.log(repeatMsg1.repeat(5)); // Bad weather... All departures delayed... x5

const planesInLine = function(n) {console.log(`There are ${n} planes in line ${'🛫'.repeat(n)}`)};

planesInLine(5); // 120workingWithStrings1.js:203 There are 5 planes in line 🛫🛫🛫🛫🛫




//--------------------------------------------------------------------------------------------------------
// Practice
//--------------------------------------------------------------------------------------------------------
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

/*
underscore_case
 first_name
Some_variable
   calculate_AGE
delayed_departure
*/

document.querySelector('button').addEventListener('click', function(){
    const text0 = document.querySelector('textarea').value;
    console.log(typeof text0); //string

    const rows = text0.split('\n');
    // console.log(rows);

    for(const [i, row] of rows.entries()){
        const [first, second] = row.toLowerCase().trim().split('_');
        const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
        console.log(`${output.padEnd(20)} ${'✅'.repeat(i+1)}`); 
    }
})

