'use strict';

//========================================================================================================
//Section14 - 259 Error Handling with Try Catch
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

const renderError = function(msg){
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch259 Error Handling with Try Catch (with the code from 258)

const whereAmI = async function(){
    try{    
        //Geolocation
        const pos = await getPosition();
        const {latitude: lat, longitude: lng} = pos.coords;

        //Reverse geolocation
        // const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!resGeo.ok) throw new Error('Problem getting location data');
        const dataGeo = await resGeo.json();

        //Country data
        const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
        if(!resGeo.ok) throw new Error('Problem getting country');
        const data = await res.json();
        renderCountry(data[0]);

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    }catch(err){
        // console.error(err);
        renderError(err.message);
        throw err;
    }
};


whereAmI();
console.log('First log'); //this'll be shown first

