'use strict';

//========================================================================================================
//Section14 - 244 AJAX Call: XMLHttpRequest
//========================================================================================================


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//old school way doing Ajax

const getCountryData = function(country){
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
    console.log(request.responseText);
    
    request.addEventListener('load', function(){
        console.log(this.responseText);
    
        //destructure the response, which comes as an array
        const [data] = JSON.parse(this.responseText);
    
        console.log(data);
    
        const html = `
            <article class="country">
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
    })
}

/*
Following Ajax calls are run in parallel,
cannot control which one finish first.
Thus, the order of the response is different everytime.
*/
getCountryData('kazakhstan');
getCountryData('Japan');
getCountryData('uzbekistan');
getCountryData('Christmas Island');
getCountryData('Gibraltar');
getCountryData('turkey');
