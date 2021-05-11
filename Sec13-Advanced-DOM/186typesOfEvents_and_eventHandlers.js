'use strict';

//========================================================================================================
//Section13 - 186 Types of Events and Event Handlers
//========================================================================================================
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

//--------------------------------------------------------------------------------------------------------------
//183 Selecting, Creating, Deleting Elements
//--------------------------------------------------------------------------------------------------------------
//SELECTING Elements
//select the first element with matching case
const header =  document.querySelector('.header');

//select multiple elements
const allSection = document.querySelectorAll('.section');

//CREATING Elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =  'We use cookies to improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//INSERTING Elements
//(1) prepend -> move the element to be the first child
//(2) append -> move the element to be the last child 
//(3) before() -> add the element before the header element
header.before(message);
//(4) after() -> add the element after the header element
//(5) clone the element, so it appears at the top and bottom of header
// header.append(message.cloneNode(true)); 

//DELETING Elements
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
});

//--------------------------------------------------------------------------------------------------------------
//184 styles, attributes and Classes
//--------------------------------------------------------------------------------------------------------------
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height = Number.parseFloat(getComputedStyle(message).height + 50 + 'px', 10);

//--------------------------------------------------------------------------------------------------------------
//185 - Implementing Smooth Scrolling
//--------------------------------------------------------------------------------------------------------------
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//MODERN WAY
btnScrollTo.addEventListener('click', function(e){
    section1.scrollIntoView({behavior: "smooth"});
});

//--------------------------------------------------------------------------------------------------------------
//186 - Types of Events and Event Handlers
//https://developer.mozilla.org/en-US/docs/Web/Events
//--------------------------------------------------------------------------------------------------------------
const h1 = document.querySelector('h1');

//OLD
// h1.onmouseenter = function(e){
//     alert('addEventListener: Great! You are reading the heading');
// }

//MODERN
const alertH1 = function(e){
    alert('addEventListener: Great! You are reading the heading');
    // h1.removeEventListener('mouseenter', alertH1);  // Listen to the eventListener just once
}

h1.addEventListener('mouseenter', alertH1);

//remove the eventListener after 3 sec
setTimeout(() =>  h1.removeEventListener('mouseenter', alertH1), 3000);


