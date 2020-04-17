import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {removeElement, renderElement} from "../utils/render";
import MainControl from "../components/main-control";
import SortingControl from "../components/sorting-control";
import FilmsSection from "../components/films-section";
import FilmsList from "../components/films-list";
import ShowmoreButton from "../components/showmore-button";

const FILMS_TO_RENDER = 5;
const FILMS_EXTRA_TO_RENDER = 2;

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._mainControl = new MainControl(this._films);
    this._sortingControl = new SortingControl();
    this._filmsSection = new FilmsSection();
    this._allFilmsList = null;
    this._topRatedFilmsList = null;
    this._mostCommentedFilmsList = null;
    this._loadmoreButton = new ShowmoreButton();

    this._filmCardsRendered = null;
  }

  _renderFilm(container, film) {
    const filmCard = new FilmCard(film);

    filmCard.setClickHandler(() => {
      const filmPopup = new FilmPopup(film);
      const closePopup = () => {
        removeElement(filmPopup);
        document.removeEventListener(`keydown`, onEscKeydown);
      };
      const onEscKeydown = (keydownEvt) => {
        if (keydownEvt.code === `Escape`) {
          closePopup();
        }
      };

      renderElement(document.querySelector(`body`), filmPopup);
      filmPopup.setCloseClickHandler(closePopup);
      document.addEventListener(`keydown`, onEscKeydown);
    });

    renderElement(container, filmCard); // Рендер карточек фильмов
  }

  _renderFilmsPack(container, filmsPack) {
    filmsPack.forEach((film) => {
      this._renderFilm(container, film);
    });
  }

  _renderEmptyBoard() {
    this._allFilmsList = new FilmsList(`There are no movies in our database`);
    renderElement(this._filmsSection.getElement(), this._allFilmsList);
  }

  _renderFullBoard() {
    this._allFilmsList = new FilmsList();
    renderElement(this._filmsSection.getElement(), this._allFilmsList);
    const allFilmsListContainer = this._allFilmsList.getElement().lastElementChild;
    this._renderFilmsPack(allFilmsListContainer, this._films.slice(0, FILMS_TO_RENDER));

    if (this._films.length > this._filmCardsRendered) {
      renderElement(this._allFilmsList.getElement(), this._loadmoreButton);
      this._loadmoreButton.setClickHandler(() => {
        this._renderFilmsPack(allFilmsListContainer, this._films.slice(this._filmCardsRendered, this._filmCardsRendered + FILMS_TO_RENDER));
        this._filmCardsRendered = (this._filmCardsRendered + FILMS_TO_RENDER) > this._films.length ? this._films.length : (this._filmCardsRendered + FILMS_TO_RENDER);
        if (this._filmCardsRendered === this._films.length) {
          this._loadmoreButton.hide();
        }
      });
    }

    this._topRatedFilmsList = new FilmsList(`Top rated`);
    renderElement(this._filmsSection.getElement(), this._topRatedFilmsList);
    const topRatedFilmsListContainer = this._topRatedFilmsList.getElement().lastElementChild;
    this._renderFilmsPack(topRatedFilmsListContainer, this._films.slice(0).sort((a, b) => b.rating - a.rating).slice(0, FILMS_EXTRA_TO_RENDER));

    this._mostCommentedFilmsList = new FilmsList(`Most commented`);
    renderElement(this._filmsSection.getElement(), this._mostCommentedFilmsList);
    const mostCommentedFilmsListContainer = this._mostCommentedFilmsList.getElement().lastElementChild;
    this._renderFilmsPack(mostCommentedFilmsListContainer, this._films.slice(0).sort((a, b) => b.comments.length - a.comments.length).slice(0, FILMS_EXTRA_TO_RENDER));
  }

  renderMain() {
    renderElement(this._container, this._mainControl);
    renderElement(this._container, this._sortingControl);
    renderElement(this._container, this._filmsSection);

    this._filmCardsRendered = Math.min(this._films.length, FILMS_TO_RENDER);

    if (this._filmCardsRendered === 0) {
      this._renderEmptyBoard();
    } else {
      this._renderFullBoard();
    }
  }
}
