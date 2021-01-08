'use strict';

//start guessing message
document.querySelector('.message');

console.log(document.querySelector('.message').textContent);

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

//generate answer
let secretNumber = Math.trunc(Math.random()*20 +1);
let score = document.querySelector('.score').value;
let highScore = document.querySelector('.highscore').textContent;
let checkBtn = document.querySelector('.check');
let againBtn = document.querySelector('.again');
score = 20;

//for debug
document.querySelector('.answer').textContent = secretNumber; 

//game starts here
checkBtn.addEventListener('click',
 function() {
    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess, typeof guess);

    //game logic
    if(guess > 20 || guess <= 0){ //if guess is out of range
        displayMessage('📣Please guess between 1 and 20📣');
    }else if(score >= 0 && secretNumber == guess){ //correct answer
        document.querySelector('body').style.backgroundColor = '#60b347'; //change background to green if answer is correct
        document.querySelector('.number').style.width = '10rem';
        displayMessage('🎊🍾CORRECT! CONGRATS!🍾🎊');
        checkBtn.disabled = true; //turn button into unclickable if answer is correct
        document.querySelector('.number').textContent = secretNumber;
        
        if(score >= document.querySelector('.highscore').textContent){
            document.querySelector('.highscore').textContent = score;
        }
    }else{  //incorrect answer
        document.querySelector('body').style.backgroundColor = 'red'; //change background to red if answer is incorrect
        document.querySelector('.number').style.width = '10rem';
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        if(score != 0) score--;
        document.querySelector('.score').textContent = score;
        //end game
        if(score == 0){
            displayMessage('🤧 Game Over 🤧');  
        }
    }
});


againBtn.addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc(Math.random()*20 +1);
    document.querySelector('.message').textContent = '📣Please guess between 1 and 20📣';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.answer').textContent = secretNumber; 
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').textContent = '';
    checkBtn.disabled = false;
});