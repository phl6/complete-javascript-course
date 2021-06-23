// import icons from '../${icons}'; //Parcel 1, for live server
import icons from 'url:../../img/icons.svg'; ////Parcel 2, 'url:' is used for static asset files, e.g. sound, photo, video, etc.
import { Fraction } from 'fractional';
import View from './View.js';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            console.log(btn);

            if(!btn) return;

            //***using self-defined dataset 
            const goToPage = +btn.dataset.goto;
            // console.log(goToPage);

            handler(goToPage);
        })
    }
    
    _generateMarkup(){
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage); //round up the num of pages
        console.log(numPages);
        
        const nextPageBtn = `
            <button data-goto = "${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
                
        const prevPageBtn =  `
            <button data-goto = "${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button> `;

        //Page 1, and there are other pages
        if(curPage === 1 && numPages > 1) {
            return nextPageBtn;
        }

        //Last Page
        if(curPage === numPages && numPages > 1) {
            return prevPageBtn;
        }
        
        //Other Page
        if(curPage < numPages) {
            return prevPageBtn + nextPageBtn;
        }

        //Page 1, and there are NO other pages
        return '';
    }

};

export default new PaginationView;