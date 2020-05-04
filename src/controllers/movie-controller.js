import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {removeElement, renderElement} from "../utils/render";
import moment from "moment";

export default class MovieController {
  constructor(container, film, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._filmData = film;
    this._filmCard = null;
    this._filmPopup = null;

    this._closePopup = this._closePopup.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);
  }

  _onEscKeydown(keydownEvt) {
    if (keydownEvt.code === `Escape`) {
      this._closePopup();
    }
  }

  _closePopup() {
    removeElement(this._filmPopup);
    this._filmPopup = null;
    document.removeEventListener(`keydown`, this._onEscKeydown);
  }

  _createCard() {
    this._filmCard = new FilmCard(this._filmData);

    this._filmCard.setClickHandler(() => {
      this._onViewChange();
      this._filmPopup = new FilmPopup(this._filmData, this._onDataChange);

      renderElement(document.querySelector(`body`), this._filmPopup);
      this._filmPopup.setCloseClickHandler(this._closePopup);
      document.addEventListener(`keydown`, this._onEscKeydown);
    });

    this._filmCard.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(Object.assign({}, this._filmData, {isAtWatchlist: !this._filmData.isAtWatchlist}));
    });

    this._filmCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(Object.assign({}, this._filmData, {isWatched: this._filmData.isWatched ? null : moment()}));
    });

    this._filmCard.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(Object.assign({}, this._filmData, {isFavorite: !this._filmData.isFavorite}));
    });
  }

  render() {
    this._createCard();
    renderElement(this._container, this._filmCard); // Рендер карточек фильмов
  }

  setDefaultView() {
    if (this._filmPopup) {
      this._closePopup();
    }
  }

  removeCard() {
    removeElement(this._filmCard);
  }
}
