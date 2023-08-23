import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupNxtBtn(page) {
    return `<button data-goto="${
      page + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }

  _generateMarkupPrevBtn(page) {
    return `<button data-goto="${
      page - 1
    }" class="btn--inline pagination__btn--prev">
      <span>Page ${page - 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
    </button>`;
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupNxtBtn(currPage);
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupPrevBtn(currPage);
    }

    // Other page
    if (currPage < numPages) {
      return (
        this._generateMarkupPrevBtn(currPage) +
        this._generateMarkupNxtBtn(currPage)
      );
    }

    // Page 1, no other pages
    return 'other 1 page';
  }
}

export default new PaginationView();
