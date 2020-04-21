import {renderElement} from "../utils/render";
import MainControl from "../components/main-control";
import SortingControl, {SORT_TYPE} from "../components/sorting-control";
import FilmsSection from "../components/films-section";
import FilmsList from "../components/films-list";
import ShowmoreButton from "../components/showmore-button";
import MovieController from "./movie-controller";

const FILMS_TO_RENDER = 5;
const FILMS_EXTRA_TO_RENDER = 2;

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._sortedFilms = this._films;
    this._mainControl = new MainControl(this._films);
    this._sortingControl = new SortingControl();
    this._filmsSection = new FilmsSection();
    this._allFilmsList = null;
    this._topRatedFilmsList = null;
    this._mostCommentedFilmsList = null;
    this._loadmoreButton = new ShowmoreButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._filmRenderedCount = null;
    this._filmsRendered = [];
  }

  _renderFilmsPack(container, filmsPack) {
    filmsPack.forEach((film) => {
      const filmController = new MovieController(container, film, this._onDataChange, this._onViewChange);
      this._filmsRendered.push(filmController);
      filmController.render();
    });
  }

  _renderEmptyBoard() {
    this._allFilmsList = new FilmsList(`There are no movies in our database`);
    renderElement(this._filmsSection.getElement(), this._allFilmsList);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SORT_TYPE.DEFAULT:
        this._sortedFilms = this._films;
        break;
      case SORT_TYPE.DATE:
        this._sortedFilms = this._films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SORT_TYPE.RATING:
        this._sortedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  _renderLoadmoreButton(container) {
    if (this._films.length > this._filmRenderedCount) {
      renderElement(this._allFilmsList.getElement(), this._loadmoreButton);
      this._loadmoreButton.setClickHandler(() => {
        this._renderFilmsPack(container, this._sortedFilms.slice(this._filmRenderedCount, this._filmRenderedCount + FILMS_TO_RENDER));
        this._filmRenderedCount = (this._filmRenderedCount + FILMS_TO_RENDER) > this._sortedFilms.length ? this._sortedFilms.length : (this._filmRenderedCount + FILMS_TO_RENDER);
        if (this._filmRenderedCount === this._sortedFilms.length) {
          this._loadmoreButton.hide();
        }
      });
    }
  }

  _onDataChange(filmComponent, newData) {
    const index = this._films.findIndex((it) => it === filmComponent.filmData);
    if (index === -1) {
      return;
    }
    this._films[index] = newData;
    filmComponent.rerenderCard(newData);
  }

  _onViewChange() {
    this._filmsRendered.forEach((it) => it.setDefaultView());
  }

  _renderFullBoard() {
    this._allFilmsList = new FilmsList();
    renderElement(this._filmsSection.getElement(), this._allFilmsList);
    const allFilmsListContainer = this._allFilmsList.getElement().lastElementChild;
    this._renderFilmsPack(allFilmsListContainer, this._films.slice(0, FILMS_TO_RENDER));
    this._renderLoadmoreButton(allFilmsListContainer);

    this._sortingControl.setSortTypeChooseHandler((sortTypeChosen) => {
      this._filmsRendered.forEach((filmController) => filmController.removeCard());
      this._filmsRendered = [];
      this._sortFilms(sortTypeChosen);
      this._renderFilmsPack(allFilmsListContainer, this._sortedFilms.slice(0, this._filmRenderedCount));
    });

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

    this._filmRenderedCount = Math.min(this._films.length, FILMS_TO_RENDER);

    if (this._filmRenderedCount === 0) {
      this._renderEmptyBoard();
    } else {
      this._renderFullBoard();
    }
  }
}
