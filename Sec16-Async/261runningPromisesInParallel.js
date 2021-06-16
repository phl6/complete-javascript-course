'use strict';

//========================================================================================================
//Section14 - 261 Running Promises In Parallel
//
// Receive multiple data without caring the order
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
                console.log(response);
                if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);

                return response.json();
            });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 261 Running Promises In Parallel

const get3Countries = async function(c1, c2, c3){
    try {
        //Load one promise after one
        // const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`);
        
        // console.log(data1.capital, data2.capital, data3.capital);
        
        //***Run promises at the same time (saves loading time)
        const data = await Promise.all([
            getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
        ]);

        console.log(data);

        // const [d1,d2,d3] = data;
        // console.log(d1[0].capital, d2[0].capital, d3[0].capital);
        console.log(data.map(d => d[0].capital));

    } catch (error) {
        console.error(error);
    }
};

get3Countries('Australia', 'South Africa', 'Canada');