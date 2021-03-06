import AbstractComponent from "./abstract-component";
import moment from "moment";

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    const releaseYear = moment(this._film.releaseDate).year();
    const filmDuration = `${moment.duration(this._film.runtime, `minutes`).hours()}h ${moment.duration(this._film.runtime, `minutes`).minutes()}m`;
    const shortDescription = this._film.description.length > 140 ? `${this._film.description.slice(0, 139)}...` : this._film.description;

    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._film.name}</h3>
      <p class="film-card__rating">${this._film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${this._film.genres.length ? this._film.genres[0] : ``}</span>
      </p>
      <img src="${this._film.posterImage}" alt="${this._film.name}" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${this._film.comments.length} comment${this._film.comments.length > 1 ? `s` : ``}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._film.isAtWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._film.isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${this._film.isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>
    `;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (!(evt.target.className === `film-card__title`) &&
        !(evt.target.className === `film-card__poster`) &&
        !(evt.target.className === `film-card__comments`)) {
        return;
      }
      handler();
    });
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`button.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`button.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`button.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
