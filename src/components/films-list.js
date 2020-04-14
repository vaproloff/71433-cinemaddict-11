import {createElement} from "../utils";

export default class FilmsList {
  constructor(title) {
    this._title = title;

    this._element = null;
  }

  getTemplate() {
    return `
    <section class="films-list${this._title ? `--extra` : ``}">
      <h2 class="films-list__title${this._title ? `` : ` visually-hidden`}">${this._title ? this._title : `All movies. Upcoming`}</h2>
      <div class="films-list__container">
      </div>
    </section>
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
