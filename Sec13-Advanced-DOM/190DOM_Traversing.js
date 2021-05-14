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
//Event Delegation:
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
// 190 DOM Traversing
//--------------------------------------------------------------------------------------------------------------
const h1 = document.querySelector('h1');

//DOWNWARDS: child
console.log(h1.querySelectorAll('.highlight')); //NodeList(2) [span.highlight, span.highlight]

//(1-1) return Live HTML Collection of direct children
console.log(h1.children); 

//(1-2) dun use
console.log(h1.childNodes);

//(1-3-1) set property on a child (firstElementChild)
h1.firstElementChild.style.color = 'white';
//(1-3-2) set property on a child (lastElementChild)
h1.lastElementChild.style.color = 'orangered';

//UPWARDS: parents
//(2-1) return Live HTML Collection of direct parent
console.log(h1.parentElement);

//(2-2) dun use
console.log(h1.parentNode);

//(2-3) not direct parent
//.closet() is very similar to querySelector
//querySelector() finds elements downwards while closest finds elements upwards
h1.closest('.header').style.background = 'var(--gradient-secondary)'; //using css variable

//SIDEWAYS: siblings
//(3-1) only the direct sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

//(3-2) dun use 
console.log(h1.previousSibling);
console.log(h1.nextSibling);

//go up one level and return all the children of the parent
console.log(h1.parentElement.children); //HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]

[...h1.parentElement.children].forEach(function(el){
    if(el !== h1) el.style.transform = 'scale(0.5)';
})