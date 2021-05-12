'use strict';

//========================================================================================================
//Section13 - 187 Event Propagation: Bubbling and Capturing
//========================================================================================================
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');

const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////////////////////////////////////
//Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* START OF IMPLEMENTING FUNCTIONS */

//--------------------------------------------------------------------------------------------------------------
// ***189 Event Delegation: Page Navigation 
//--------------------------------------------------------------------------------------------------------------
// METHOD1: without Event Delegation:
//(1) retrieve all the element with class name '.nav__link'
//(2) get the element attribute whenever a button is clicked
//(3) use that anchor id (<a href>) to perform action

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault(); // avoid moving to the destination by default, use JS instead
//     const id = this.getAttribute('href'); //using getAttribute to get the destination of scrollTo
//     document.querySelector(id).scrollIntoView({behavior: "smooth"})
//   });
// });


// METHOD2: WITH Event Delegation:
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  //Matching Strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href'); //using getAttribute to get the destination of scrollTo
    console.log(id, 'is clicked');
    document.querySelector(id).scrollIntoView({behavior: "smooth"})
  }
})



/* END OF IMPLEMENTING FUNCTIONS */

//--------------------------------------------------------------------------------------------------------------
//187 & 188 Event Propagation: Bubbling and Capturing
//--------------------------------------------------------------------------------------------------------------
// // rgb(255,255,255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;
// console.log(randomColor());

// //Parent Node 1
// document.querySelector('.nav').addEventListener('click', function(e){
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', e.target === this);
// });

// //Child Node 1
// document.querySelector('.nav__links').addEventListener('click', function(e){
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', e.target === this);
// });

// //Child Node 2
// document.querySelector('.nav__link').addEventListener('click', function(e){
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', e.target === this);
//     // e.stopPropagation();
// });

//--------------------------------------------------------------------------------------------------------------
//189 Event Delegation: Implementing Page Navigation
//--------------------------------------------------------------------------------------------------------------


