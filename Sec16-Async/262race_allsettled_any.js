'use strict';

//========================================================================================================
//Section14 - 262 Other Promise Combinators: Race, Allsettled and ANY
//========================================================================================================


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


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

  //from 256
  const getPosition = function(){
    const options = {
      enableHighAccuracy: true
    };

    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    })
};

const renderError = function(msg){
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
}

// from 250, generic function to do data fetching and ERROR HANDLING
const getJSON = function(url, errorMsg = 'Something went wrong'){
    return fetch(url)
            .then(response => {
                // console.log(response);
                if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);

                return response.json();
            });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 262 Other Promise Combinators: Race, Allsettled and ANY

//***Promise.race (return a promsie, settled as soon as one of the input promises settles)
//only return the fastest result 
// (async function () {
//     const res = await Promise.race([
//       getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//       getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//       getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//     ]);
//     console.log(res[0]);
// })();

// const timeout = function(sec){
//     return new Promise(function(_, reject){
//         reject(new Error('Request took too long!'))
//     }, sec);
// };

// Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     timeout(5)
// ]).then(res => console.log(res[0]))
//   .catch(err => console.error(err));


//Promise.allSettled
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success'),
])
    .then(res => console.log(res))
    .catch(err => console.error(err));

//***Promise.all
//Promise.all([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Another Success'),
// ])
//     .then(res => console.log(res))
//     .catch(err => console.error(err));    


//Promise.any (ES2021)
//return the first fulfilled promise and IGNORE rejected promise
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success'),
])
    .then(res => console.log(res))
    .catch(err => console.error(err));   