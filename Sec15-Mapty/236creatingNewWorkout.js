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

    coords = [];
    distance;
    duration;
    
    constructor(coords, distance, duration) {
        // this.date = ...;
        // this.id = ...;
        this.coords = coords;     //[lat, lng]
        this.distance = distance; //in km
        this.duration = duration; //in min
    };
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
  #workouts = [];

  constructor() {
    console.log(this); //this <- App
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
        alert('Could not get your position');
      });
  }

  _loadMap(position) {
    console.log(this);
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    // 230 Displaying Map Using Leafleft Library
    const coords = [latitude, longitude];

    //link with id 'map' in index.html to be able to use leaflet map api
    this.#map = L.map('map').setView(coords, 14);

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

  _newWorkout(e) {
    // const validInputs = (...inputs) => inputs.every(input => Number.isFinite(input));
    // const allPositive = (...inputs) => inputs.every(input => input > 0);
    const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    console.log(this);
    e.preventDefault();

    //Get data from form
    const type = inputType.value;
    const distance = inputDistance.value;
    const duration = inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //if running, creating running object
    if(type === 'running'){
        const cadence = inputCadence.value;
        //Check if data is valid
        // Guard Clause
        if(!validInputs(distance, duration, cadence) && !allPositive(distance, duration, cadence))
            return alert('Inputs have to be positive number');
        workout = new Running([lat, lng], distance, duration, cadence);        
    }
    
    //if cycling, creating cycling object
    if(type === 'cycling'){
        const elevation = inputElevation.value;
        //Check if data is valid
        if(!validInputs(distance, duration, elevation) && !allPositive(distance, duration))
            return alert('Inputs have to be positive number');
        workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    
    //add new object to workouts array
    this.#workouts.push(workout);

    //render workout on map a marker
    this.renderWorkoutMarker(workout);

    //render workout on the list
    
    // Hide form + clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    
    // Display marker
    console.log(this.#mapEvent);
    
    renderWorkoutMarker(workout){
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
        .setPopupContent(workout.distance)
        .openPopup();
    };

    }
}

//Initialize the app
const app = new App();

