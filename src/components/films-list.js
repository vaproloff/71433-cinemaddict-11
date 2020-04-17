import AbstractComponent from "./abstract-component";

export default class FilmsList extends AbstractComponent{
  constructor(title) {
    super();
    this._title = title;
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
}
