'use strict';

//========================================================================================================
//Section14 - 258 Consuming Promise with ASYNC/AWAIT
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
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch258 Consuming Promise with ASYNC/AWAIT

//****BUILDING ASYNC FUNCTION****
//keep running in the background, once the function is done, a promise is automatically returned
//async can have more than 1 await
const whereAmI = async function(){
    //Geolocation
    const pos = await getPosition();
    const {latitude: lat, longitude: lng} = await pos.coords;

    //Reverse geolocation
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //Async and Await way
    //await here will stop the code execution at this point until the promise is fulfilled
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
    console.log(res); //promise
    const data = await res.json();
    console.log(data); //array
    renderCountry(data[0]);
};

// whereAmI();
whereAmI(); //this'll be shown later
console.log('First log'); //this'll be shown first