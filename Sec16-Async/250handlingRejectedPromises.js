'use strict';

//========================================================================================================
//Section14 - 250 Handling Rejected Promises
/*
Promise:
(Formal) An object that is used as a placeholder for the future result of an async operation.
(less formal) A container for an asynchronously delivered value
(least formal) A container for a future value. e.g. Response from AJAX call

We no longer need to rely on events and callbacks passed into async functions to handle async results.
Instead of nesting callbacks, we can "chain promises" for a seq of asynchronous operations: !!!escaping callback hell!!!.

The Promise Lifecycle:
1) Pending(Before the future value is available) -> [Async task] ->
2) Settled(Async task has finished) ->
2-1) Fulfiled (Success, value is now available)
2-2) Rejected (error occured)
*/
//========================================================================================================


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const renderCountry = function(data, className =''){
    const html = `
    <article class="country ${className}">
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} million people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].nativeName}</p>
    <p class="country__row"><span>${data.currencies[0].symbol}</span>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
}

const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch247 Promises and The Fetch API
// const request = fetch(`https://restcountries.eu/rest/v2/name/japan`);
// console.log(request);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch248 Consuming Promise
const getCountryData_ConsumePromise = function(country){
    fetch(`https://restcountries.eu/rest/v2/name/${country}`) //(1) fetch function returns a promise
    .then(response => {                                     //(2) handle the returned promise using the then method
        console.log(response); 
        return response.json();                               //(3) cast the response object to json object, which "also" returns a promise
    })
    .then(data => {                                         //(4) handle the promise (JSON obj) using then
        console.log(data);
        renderCountry(data[0]); 
     });
};

// getCountryData_ConsumePromise('japan');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ch249 Chaining Promises
const getCountryData_ChainingPromise = function(country){
    //Country 1
    fetch(`https://restcountries.eu/rest/v2/name/${country}`) 
    .then(response => response.json())
    .then(data => {                                           
        renderCountry(data[0]); 
        const neighbour = data[0].borders[0];

        if(!neighbour) return;

        //Country 2, second AJAX call
        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};
    
// getCountryData_ChainingPromise('United States of America');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ch250 Handling Rejected Promises
const getCountryData_handleRejPromise = function(country){
    fetch(`https://restcountries.eu/rest/v2/name/${country}`) 
    //(1) Handle Rejected Promise here by passing in second arg
    // .then(response => response.json(), err => alert(err))
    .then(response => {response.json()})
    .then(data => {                                           
        renderCountry(data[0]); 
        const neighbour = data[0].borders[0];

        if(!neighbour) return;

        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
    })
    // .then(response => response.json(), err => alert(err))
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    //(2) Or, handle error globally
    .catch(err => {
        console.log(`${err}`);
        renderError(`Something went wrong ${err.message}. Try Again!`);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
};

// btn.addEventListener('click', () => getCountryData_handleRejPromise('portugal'));
// getCountryData_handleRejPromise('adsfa');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ch251 Throwing Error Manually
// const getCountryData_throwErrManually = function(country){
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`) 
//     .then(response => {
//         console.log(response);

//         if(!response.ok) throw new Error(`Country not found (${response.status})`);

//         return response.json();
//     })
//     .then(data => {                                           
//         renderCountry(data[0]); 
//         // const neighbour = data[0].borders[0];
//         const neighbour = `fands`;

//         if(!neighbour) return;

//         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
//     })
//     .then(response => {
//         if(!response.ok) throw new Error(`Country not found (${response.status})`);
//         return response.json()
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//         console.log(`${err}`);
//         renderError(`Something went wrong ${err.message}. Try Again!`);
//     })
//     .finally(() => {
//         countriesContainer.style.opacity = 1;
//     })
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//251 cont'd

//generic function to do data fetching and ERROR HANDLING
const getJSON = function(url, errorMsg = 'Something went wrong'){
    return fetch(url)
            .then(response => {
                console.log(response);
                if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);

                return response.json();
            });
}

//Refactor the getCountryData_throwErrManually function
const getCountryData_throwErrManually = function(country){
    // fetch(`https://restcountries.eu/rest/v2/name/${country}`) 
    // .then(response => {
    //     console.log(response);

    //     if(!response.ok) throw new Error(`Country not found (${response.status})`);

    //     return response.json();
    // })
    getJSON(`https://restcountries.eu/rest/v2/name/${country}`, `Country not found`)
    .then(data => {                                           
        renderCountry(data[0]); 
        const neighbour = data[0].borders[0];
        // const neighbour = `fands`;

        if(!neighbour) throw new Error('No neighbour found!');

        return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, `Country not found`)
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
        console.log(`${err}`);
        renderError(`Something went wrong ${err.message}. Try Again!`);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
};

//250
// btn.addEventListener('click', getCountryData_handleRejPromise('portugal'));
// getCountryData_handleRejPromise('fvdasf');

//251
btn.addEventListener('click', () => getCountryData_throwErrManually('japan'));
// getCountryData_throwErrManually('fasdf');