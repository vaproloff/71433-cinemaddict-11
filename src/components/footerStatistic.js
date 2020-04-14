import {createElement} from "../utils";

export default class FooterStatistic {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;

    this._element = null;
  }

  getTemplate() {
    return `
    <p>${this._filmsCount}</p>
    `;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
