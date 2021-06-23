import View from './View.js';

class searchView extends View{
    _parentEl = document.querySelector('.search');
    _btn = document.querySelector('.search__btn');
    
    //Public Functions
    getQuery(){
        // return document.querySelector('.search__field').value;
        // const query = this._parentEl.querySelector('.search__field').value;
        const query = document.querySelector('.search__field').value;
        this._clearInput();
        return query;
    };
    
    //Publisher
    addHandlerSearch(handler){
        this._parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        });
    };

    _clearInput(){
        this._parentEl.querySelector('.search__field').value = '';
    };
}

export default new searchView();