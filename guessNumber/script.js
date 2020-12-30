'use strict';

//start guessing message
document.querySelector('.message');

console.log(document.querySelector('.message').textContent);

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

//generate answer
let secretNumber = Math.trunc(Math.random()*20 +1);
let guess = document.querySelector('.guess').value;
let score = document.querySelector('.score').value;
score = 20;

//for debug
document.querySelector('.answer').textContent = secretNumber; 

//game starts here
document.querySelector('.check').addEventListener('click',
 function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    //when score > 0 , game continues
    if(!guess){
        displayMessage('No input');
    }else if(secretNumber == guess){
        displayMessage('CORRECT! CONGRATS');

        if(score > highScore){
            document.querySelector('.highScore').textContent = score;
        }
    }else{
        //if answer is incorrect
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        score--;
        document.querySelector('.score').textContent = score;
        //end game
        if(score == 0){
            displayMessage('GAME OVER');  
            document.querySelector('.score').textContent = 0;
        }
    }
});