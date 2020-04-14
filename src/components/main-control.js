import {createElement} from "../utils";

export default class MainControl {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    const watchlistCount = this._films.filter((it) => it.isAtWatchlist).length;
    const historyCount = this._films.filter((it) => it.isWatched).length;
    const favoritesCount = this._films.filter((it) => it.isFavorite).length;

    return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
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
