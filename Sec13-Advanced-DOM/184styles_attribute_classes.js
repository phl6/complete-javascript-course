'use strict';

//========================================================================================================
//Section13 - 184 styles.attributes and Classes
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

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//////////////////////////////
//Selecting Elements//////////
//////////////////////////////

//Modern:

//select the first element with matching case
const header =  document.querySelector('.header');

//select multiple elements
const allSection = document.querySelectorAll('.section');
console.log(allSection); // [section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up]

//Old ways:

//getElementById
document.getElementById('section--1');

//getElementsByTagName
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollection(9) [button.btn--text.btn--scroll-to, ..., button.btn--close-modal, button.btn]

//getElementsByClassName
console.log(document.getElementsByClassName('btn'));

//--------------------------------------------------------------------------------------------------------------
//////////////////////////////
//Creating Elements///////////
//////////////////////////////
//e.g.
// .insertAdjacentHTML (used in bankist app)

//Creating Element
const message = document.createElement('div');
message.classList.add('cookie-message');

// message.textContent = 'We use cookies to improve functionality and analytics.';
message.innerHTML =  'We use cookies to improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//--------------------------------------------------------------------------------------------------------------
//////////////////////////////
//Inserting Elements//////////
//////////////////////////////

//(1) prepend -> move the element to be the first child
header.prepend(message);

//(2) append -> move the element to be the last child 
// header.append(messgage);

//(4) before() -> add the element before the header element
// header.before(message);

//(5) after() -> add the element after the header element
// header.after(message);

//(5) clone the element, so it appears at the top and bottom of header
// header.append(message.cloneNode(true)); 

//--------------------------------------------------------------------------------------------------------------
//////////////////////////////
//Deleting Elements///////////
//////////////////////////////

//remove() -> remove element
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
});

//old way (DOM Traversing)
// document.querySelector('.btn--close-cookie').addEventListener('click', function(){
//   message.parentElement.removeChild(message);
// });


//--------------------------------------------------------------------------------------------------------------
//184 styles, attributes and Classes
//--------------------------------------------------------------------------------------------------------------
//styles
//------------------------------
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // nothing
console.log(message.style.backgroundColor); // rgb(55, 56, 61)

console.log(getComputedStyle(message).height); //43px

message.style.height = Number.parseFloat(getComputedStyle(message).height + 30 + 'px', 10);
console.log(getComputedStyle(message).height);

//changing css variables
document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
//--------------
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //Bankist logo
console.log(logo.src); //http://127.0.0.1:5500/img/logo.png
console.log(logo.className); //nav__logo

// logo.alt = 'Beautiful minimalist logo'

//Non-standard
console.log(logo.designer); //undefined <- this is not a standard property 

//Get and SetAttribute
console.log(logo.getAttribute('designer')); //Jonas
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('src')); //img/logo.png

const link = document.querySelector('.twitter-link');
console.log(link.href); // https://twitter.com/jonasschmedtman
console.log(link.getAttribute('href')); // https://twitter.com/jonasschmedtman

//Data attributes
console.log(logo.dataset.versionNumber); //3.0


//Classes
//-------------

//Use these
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

//Don't use
//this overrides all existing classes and only put one class on any elements
logo.className = 'Jonas';