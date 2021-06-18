class searchView{
    #parentEl = document.querySelector('.search');
    #btn = document.querySelector('.search__btn');
    
    //Public Functions
    getQuery(){
        // return document.querySelector('.search__field').value;
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    };
    
    //Publisher
    addHandlerSearch(handler){
        this.#parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        });
    };

    #clearInput(){
        this.#parentEl.querySelector('.search__field').value = '';
    };
}

export default new searchView();