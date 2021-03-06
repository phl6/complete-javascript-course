'use strict';

//========================================================================================================
//Section14 - 246 Callback Hell
//it means, nested callback
//========================================================================================================


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
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
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);
}


//Ch244 
const getCountryData = function(country){
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
    // console.log(request.responseText);
    
    request.addEventListener('load', function(){
        console.log(this.responseText);
        //destructure the response, which comes as an array
        const [data] = JSON.parse(this.responseText);
        // console.log(data);
        renderCountry(data);
    })
}


const getCountryAndNeighbour = function(country){
    const request1 = new XMLHttpRequest();
    request1.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request1.send();
    
    request1.addEventListener('load', function(){
        const [data] = JSON.parse(this.responseText);
        //Render Country (1):
        renderCountry(data);

        //Get neighbour country (2) from country(1)
        const [neighbour] = data.borders;
        if(!neighbour) return; //guard if no neighbour

        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        request2.send();

        //Nested callbacks (Callback Hell)
        request2.addEventListener('load', function(){
            const data2 = JSON.parse(this.responseText);
            renderCountry(data2, 'neighbour');
        });

    })
}

//Ch244 parallel ajax call
// getCountryData('kazakhstan');
// getCountryData('Japan');

// Ch246 callback hell - execute one by one, instead parallely
// getCountryAndNeighbour('Christmas Island');
// getCountryAndNeighbour('Gibraltar');
getCountryAndNeighbour('United States of America');

//Callback hell
// setTimeout(() => {
//     console.log('1second passed');
//     setTimeout(() => {
//         console.log('2 second passed');
//         setTimeout(() => {
//             console.log('3 second passed');
//             setTimeout(() => {
//                 console.log('4 second passed');
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000);