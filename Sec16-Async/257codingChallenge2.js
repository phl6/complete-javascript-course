'use strict';

//========================================================================================================
//Section14 - 257 Coding Challenge 2
//========================================================================================================


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch257 Coding Challenge #2
///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. 
PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) and 
sets the .src attribute to the provided image path. 
When the image is done loading, append it to 
the DOM element with the 'images' class, and resolve the promise.
The fulfilled value should be the image element itself. 
In case there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.
PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), 
and load a second image (HINT: Use the image element returned by the createImage promise to hide 
the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. 
Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/

const wait = function(sec){
    return new Promise(function(resolve, reject){
        setTimeout(resolve, sec * 1000);
    });
}

const createImage = function(imgPath){
    return new Promise(function(resolve, reject){
        const img = document.createElement('img');
        img.src = imgPath;
        
        img.addEventListener('load', function(){
            imgContainer.append(img);  
            resolve(img);
        });

        img.addEventListener('error', function(){
            reject(new Error('image not found'));
        });
    })
};

//global variable
let currentImg;

createImage('./img/img-1.jpg')
.then(img => {
    currentImg = img;
    console.log('img 1 is loaded');
    return wait(2);
})
.then(() => {
    currentImg.style.display = 'none';
    return createImage('./img/img-2.jpg');
})
.then(img => {
    currentImg = img;
    console.log('img 2 is loaded');
    return wait(2);
})
.then(() => {
    currentImg.style.display = 'none';
})
.catch(err => console.error(err))
;
