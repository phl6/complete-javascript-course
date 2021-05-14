'use strict';

//========================================================================================================
//Section13 - 193 Implementing a Sticky Navigation: The Scroll Event
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
//194
const header = document.querySelector('.header');


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

//--------------------------------------------------------------------------------------------------------------
// 193 Implementing a Sticky Navigation: The Scroll Event
//--------------------------------------------------------------------------------------------------------------
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function(e){
//     if(window.scrollY > initialCoords.top){
//         nav.classList.add('sticky');
//     }else{
//         nav.classList.remove('sticky');
//     }
// })

//--------------------------------------------------------------------------------------------------------------
// 194 A Better way than 193 -> Sticky Navigation: The Intersection Observer API
//--------------------------------------------------------------------------------------------------------------

// entries = the array of threshold entries in obsOptions
// const obsCallback = function(entries, observer){
//     entries.forEach(entry => {
//         console.log(entry);
//     })
// };

// const obsOptions = {
//     root: null,
//     threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);


const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
    const [entry] = entries;
    console.log(entry);

    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


/* END OF IMPLEMENTING FUNCTIONS */