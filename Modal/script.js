`use strict`;

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal'); //querySelectorAll, array of buttons, returns a node list, 

//console.log(btnsOpenModal);

//open modal
const openModal = () => {
    console.log('Button Clicked');
    modal.classList.remove('hidden'); //using classList
    overlay.classList.remove('hidden');
};

//close modal
const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

//open the modal, handling an array of buttons
for(let i = 0; i < btnsOpenModal.length; i++)  
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal); //close the modal by clicking the cross button
overlay.addEventListener('click', closeModal); //close the modal by clicking empty space

//keydown = press any button on keyboard. e stands for event object here as an argument
document.addEventListener('keydown', (e) => { 
    console.log(e.key);
    if(e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); //used classList.contains() to check if the modal is opened
    //console.log('Esc is pressed')
});