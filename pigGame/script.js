'use strict';

//Selecting DOM Elements
let diceEl = document.querySelector('.dice');
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let currentEl0 = document.querySelector(`#current-0`);
let currentEl1 = document.querySelector(`#current-1`);
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

//Buttons
let rollBtn = document.querySelector('.btn--roll');
let newGameBtn = document.querySelector('.btn--new');
let holdBtn = document.querySelector('.btn--hold');

let dice, playing, currentScore, activePlayer, scores ; //storing scores of playes, scores[0] = player0, scores[1] = player1

let rollDice = () => dice = Math.trunc(Math.random() * 6 + 1);

let changePic = (dice) => diceEl.src = `dice-${dice}.png`;

let switchPlayer = () => {
    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    console.log(`Switched to Player${activePlayer}`);
    player0El.classList.toggle('player--active'); //toggle means if element exists, remove it
    player1El.classList.toggle('player--active'); // if elements doesn't exist, add it 
} 

//reset the game
let init = () => {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;
    
    rollBtn.disabled = false;
    holdBtn.disabled = false;
    
    diceEl.classList.add('hidden'); //hide the dice with css at starting phase
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

//new game or reset game functionality
newGameBtn.addEventListener('click', () => init());


rollBtn.addEventListener('click', () => {
    if(playing){
        if(diceEl.classList.contains('hidden')) diceEl.classList.remove('hidden');
        rollDice();
        changePic(dice); //display dice
        console.log(`dice: ${dice}`);
        
        if(dice !== 1){
            currentScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
        }else{
            // scores[activePlayer] += currentScore;
            switchPlayer();
        }
    }
    
});

holdBtn.addEventListener('click', () => {
    if(playing){
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 20){
            //Game Over 
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            rollBtn.disabled = true;
            holdBtn.disabled = true;
        }else{
            switchPlayer();
        }
    }
});



//roll Dice functionality
// diceBtn.addEventListener('click', () => {
//     if(diceEl.classList.contains('hidden')) diceEl.classList.remove('hidden');
//     rollDice();
//     changePic(dice);
//     console.log(`dice: ${dice}`);
//     let currentPlayerScore = Number(document.querySelector(`#current-${currentPlayer}`).textContent);

//     if(dice !== 1){
//         currentPlayerScore += dice;
//         document.querySelector(`#current-${currentPlayer}`).textContent = currentPlayerScore;
//         console.log(currentPlayerScore);
//     }else{
//         let currentFinalScore = Number(document.querySelector(`#score--${currentPlayer}`).textContent);
//         currentFinalScore += currentPlayerScore;
//         document.querySelector(`#score--${currentPlayer}`).textContent = currentFinalScore;
//         document.querySelector(`#current-${currentPlayer}`).textContent = 0;
//         switchPlayer();
//         console.log(`Switched to Player${currentPlayer}`);
//     }
// });