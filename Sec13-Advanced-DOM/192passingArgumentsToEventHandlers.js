'use strict';

//========================================================================================================
//Section13 - 192 Passing Arguments to Event Handlers
//========================================================================================================
//189
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
//191
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
//192
const nav = document.querySelector('.nav');

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

//--------------------------------------------------------------------------------------------------------------
// 191 Building a Tabbed Component
//--------------------------------------------------------------------------------------------------------------
tabsContainer.addEventListener('click', function(e){
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //***Guard Clause
  if(!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');
  
  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//--------------------------------------------------------------------------------------------------------------
// 192 Passing Arguments to Event Handlers
//--------------------------------------------------------------------------------------------------------------
//Menu Fade Animation

const handleHover = function(e){
    e.preventDefault();

    if(e.target.classList.contains('nav__link')){
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if(el !== link) el.style.opacity = this;
        });

        logo.style.opacity = this;
    }
}

// nav.addEventListener('mouseover',  e => handleHover(e, 0.5));
nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout',  e => handleHover(e, 1));
nav.addEventListener('mouseout',  handleHover.bind(1));


/* END OF IMPLEMENTING FUNCTIONS */