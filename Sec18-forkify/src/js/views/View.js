import icons from 'url:../../img/icons.svg'; ////Parcel 2, 'url:' is used for static asset files, e.g. sound, photo, video, etc.

export default class View {
//PROTECTED Variables
_data;

//PUBLIC FUNCTIONS
    render(data){
        //if no data or (data is an empty array)
        if(!data || (Array.isArray(data) && data.length ===0 ))  return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    update(data){
        if(!data || (Array.isArray(data) && data.length ===0 ))  return this.renderError();

        this._data = data;
        const newMarkup = this._generateMarkup();

        //convert string to real DOM object
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        console.log(newElements);
        console.log(curElements);
    };

    renderSpinner(){
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
            `;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderError(message = this._errorMessage){
        const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderMessage(message = this._successMessage){
        const markup = `
        <div class="recipe">
            <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
            <p>${message}</p>
        </div>`

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    _clear(){
        //clear the content of the HTML
        // console.log(this._parentElement);
        // console.log('Content has been cleared');
        this._parentElement.innerHTML = "";
      }
}