'use strict';

//========================================================================================================
//Section14 - 236 Creating New Workout
//========================================================================================================
// prettier-ignore

// Application Architecture
// 235 Creating Classes
class _Workout {    
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    coords = [];
    distance = 0;
    duration = 0;
    description ='';
    
    constructor(coords, distance, duration) {
        // this.date = ...;
        // this.id = ...;
        this.coords = coords;     //[lat, lng]
        this.distance = distance; //in km
        this.duration = duration; //in min
    };

    //private interface
    _setDescription() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    //public interface
    click() {
      this.clicks++;
    }
}

class Running extends _Workout {
    type = 'running';
    cadence;
    pace;

    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.type = 'running';
        this.calcPace();
        this._setDescription();
    };

    calcPace(){
        // min / km
        this.pace = this.duration/this.distance;
        return this.pace;
    }
}

class Cycling extends _Workout {
    type = 'cycling';
    elevationGain;
    speed;

    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.type = 'cycling';
        this.calcSpeed();
        this._setDescription();
    };

    calcSpeed(){
        // km / hr
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

//tests
// const run1 = new Running([39,-12], 5.2, 24, 178);
// const cycling1 = new Cycling([39,-12], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Application Architecture
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
//Private Instance Properties
  #map;
  #mapEvent;
  #mapZoomLevel = 14;
  #workouts = [];

  constructor() {
    console.log(this); //this <- App
    this._getPosition();
    this._getLocalStorage();
    console.log('1');
    form.addEventListener('submit', this._newWorkout.bind(this));
    console.log('2');
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveTopPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
        alert('Could not get your position');
      });
  }

  _loadMap(position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    // 230 Displaying Map Using Leafleft Library
    const coords = [latitude, longitude];

    //link with id 'map' in index.html to be able to use leaflet map api
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    // 231 Displaying a Map Marker
    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    //render markers of stored workouts 
    this.#workouts.forEach(workout => this._renderWorkoutMarker(workout));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _renderWorkoutMarker(workout){
    L.marker(workout.coords)
     .addTo(this.#map)
     .bindPopup(
    L.popup({
        maxWidth: 250,
        maxLength: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${workout.type}-popup`, //css
    }))
    .setPopupContent(`${workout.type === 'running' ? `🏃‍♂️` : '🚴‍♀️'} ${workout.description}`)
    .openPopup();
  }

  _renderWorkout(workout){
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
      `;

      if(workout.type === 'running'){
        html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">🦶spm</span>
        </div>
        </li>
        `
      };

      if(workout.type === 'cycling'){
        html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
        
        `
      }

    form.insertAdjacentHTML('afterend', html);
  }

  _hideFrom(){
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => form.style.display = 'grid', 1000);
  }

  // Converting the JSON string with JSON.stringify()
  // then saving with localStorage in the name of session 
  _setLocalStorage(){
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage(){
    const data = JSON.parse(localStorage.getItem('workouts'));
    //guard clause
    if(!data) return;

    this.#workouts = data;
    this.#workouts.forEach(workout => this._renderWorkout(workout));
  }

  _newWorkout(e) {
    console.log(this);
    // Mini functions
    const validInputs = (...inputs) => inputs.every(input => Number.isFinite(input));
    const allPositive = (...inputs) => inputs.every(input => input > 0);

    e.preventDefault();

    //Get data from form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    if(type === 'running'){
        const cadence = +inputCadence.value;
        //Check if data is valid, Guard Clause
        if(!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
          return alert('Inputs have to be positive number');
        workout = new Running([lat, lng], String(distance), String(duration), cadence);        
    }

    if(type === 'cycling'){
        const elevation = +inputElevation.value;
        if(!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
          return alert('Inputs have to be positive number');
        workout = new Cycling([lat, lng], String(distance), String(duration), elevation);
    }
    
    //add new object to workouts array
    this.#workouts.push(workout);

    //render workout marker on map 
    this._renderWorkoutMarker(workout);

    //render workout on the list
    this._renderWorkout(workout);
    
    // Hide form + clear input fields
    this._hideFrom();
    
    // Display marker
    console.log(this.#mapEvent);

    //save workouts array to local storage
    this._setLocalStorage();
  }

  _moveTopPopup(e){
    //get the DOM element 
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if(!workoutEl) return;

    //get the element according to the id, which is a  custom HTML data attribute
    const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
    // console.log(workout);

    //using the map api
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1
      }
    });

    //using the public interface
    // workout.click();
  }

  reset(){
    localStorage.clear();
    location.reload();
  }
}

//Initialize the app
const app = new App();

