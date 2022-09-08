import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { sortByTime } from '../model.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _addHandlerClickSort(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--sort');

      if (!btn) return;

      let { option } = btn.dataset;
      console.log(option);

      if (option === 'Time') {
        option = 'Ingredients';
        handler('Ingredients');
      } else {
        option = 'Time';

        handler('Time');
      }
    });
  }

  _generateMarkup() {
    console.log('informacion de data', this._data);
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentOption = this._data.optionSort;
    // console.log(this._sortedBy);
    //page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <p class="info-pages">page ${currentPage} of ${numPages} </p>

        ${this._buttonPagination('next')}
        <button class="btn--sort pagination__btn--middle" data-option="${
          currentOption === 'Time' ? 'Time' : 'Ingredients'
        }">
          <span> Sort By ${
            currentOption === 'Time' ? 'Time' : 'Ingredients'
          }</span> 
        </button>
      `;
    }
    //last page
    if (currentPage === numPages && numPages > 1) {
      return `
        <p class="info-pages">page ${currentPage} of ${numPages} </p>
        ${this._buttonPagination('prev')}
        <button class="btn--sort pagination__btn--middle" data-option="${
          currentOption === 'Time' ? 'Time' : 'Ingredients'
        }">
          <span> Sort By ${
            currentOption === 'Time' ? 'Time' : 'Ingredients'
          }</span> 
        </button>
      `;
    }
    //middle page
    if (currentPage < numPages) {
      return `
        <p class="info-pages">page ${currentPage} of ${numPages} </p>
        ${this._buttonPagination('prev')}
        ${this._buttonPagination('next')}
        <button class="btn--sort pagination__btn--middle" data-option="${
          currentOption === 'Time' ? 'Time' : 'Ingredients'
        }">
          <span> Sort By ${
            currentOption === 'Time' ? 'Time' : 'Ingredients'
          }</span> 
        </button>
      `;
    }
    //page 1, and there are NO other pages
    return `
      <button class="btn--sort pagination__btn--middle" data-option="${
        currentOption === 'Time' ? 'Time' : 'Ingredients'
      }">
        <span> Sort By ${
          currentOption === 'Time' ? 'Time' : 'Ingredients'
        }</span> 
      </button>
    `;
  }
  _buttonPagination(direction) {
    const currentPage = this._data.page;

    if (direction === 'next') {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
    }
    if (direction === 'prev') {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">  
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        `;
    }
  }
}

export default new PaginationView();
