import UserLevel from "./components/user-level";
import MainControl from "./components/main-control";
import SortingControl from "./components/sorting-control";
import FilmsSection from "./components/films-section";
import FilmsList from "./components/films-list";
import FilmCard from "./components/film-card";
import FilmPopup from "./components/film-popup";
import ShowmoreButton from "./components/showmore-button";
import FooterStatistic from "./components/footerStatistic";
import {renderElement} from "./utils";
import {generateFilmBase} from "./mocks/film-cards";

const FILMS_COUNT = Math.round(Math.random() * 5) + 15;
const FILMS_TO_RENDER = 5;
const FILMS_EXTRA_TO_RENDER = 2;

const renderFilm = (container, film) => {
  const filmCard = new FilmCard(film);
  const onFilmPosterClick = (clickEvt) => {
    if (!(clickEvt.target.className === `film-card__title`) &&
      !(clickEvt.target.className === `film-card__poster`) &&
      !(clickEvt.target.className === `film-card__comments`)) {
      return;
    }
    const filmPopup = new FilmPopup(film);
    const closePopup = () => {
      filmPopup.getElement().remove();
      filmPopup.removeElement();
    };
    const onEscKeydown = (keydownEvt) => {
      if (keydownEvt.code === `Escape`) {
        closePopup();
      }
    };

    renderElement(document.querySelector(`body`), filmPopup.getElement());

    filmPopup.getElement().querySelector(`button.film-details__close-btn`).addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onEscKeydown);
  };

  filmCard.getElement().addEventListener(`click`, onFilmPosterClick);

  renderElement(container, filmCard.getElement()); // Рендер карточек фильмов
};

const renderFilmsPack = (container, filmsPack) => {
  filmsPack.forEach((film) => {
    renderFilm(container, film);
  });
};

const films = generateFilmBase(FILMS_COUNT);
let filmCardsRendered = Math.min(films.length, FILMS_TO_RENDER);

renderElement(document.querySelector(`header.header`), new UserLevel(films.filter((it) => it.isWatched).length).getElement()); // Рендер статуса пользователя
renderElement(document.querySelector(`.footer__statistics`), new FooterStatistic(films.length).getElement()); // Рендер общего кол-ва фильмов
const mainContainer = document.querySelector(`main.main`);
renderElement(mainContainer, new MainControl(films).getElement());
renderElement(mainContainer, new SortingControl().getElement());
const filmsSection = new FilmsSection().getElement();
renderElement(mainContainer, filmsSection);

if (filmCardsRendered === 0) {
  renderElement(filmsSection, new FilmsList(`There are no movies in our database`).getElement());
} else {
  // Рендер всех фильмов
  const allFilmsList = new FilmsList().getElement();
  renderElement(filmsSection, allFilmsList);
  const allFilmsListContainer = allFilmsList.lastElementChild;
  renderFilmsPack(allFilmsListContainer, films.slice(0, FILMS_TO_RENDER));

  // Рендер кнопки Loadmore
  const loadmoreButton = new ShowmoreButton().getElement();
  if (films.length > filmCardsRendered) {
    renderElement(allFilmsList, loadmoreButton);
    loadmoreButton.addEventListener(`click`, () => {
      renderFilmsPack(allFilmsListContainer, films.slice(filmCardsRendered, filmCardsRendered + FILMS_TO_RENDER));
      filmCardsRendered = (filmCardsRendered + FILMS_TO_RENDER) > films.length ? films.length : (filmCardsRendered + FILMS_TO_RENDER);
      if (filmCardsRendered === films.length) {
        loadmoreButton.classList.add(`visually-hidden`);
      }
    });
  }

  // Рендер Extra фильмов
  const topRatedFilmsList = new FilmsList(`Top rated`).getElement();
  renderElement(filmsSection, topRatedFilmsList);
  const topRatedFilmsListContainer = topRatedFilmsList.lastElementChild;
  renderFilmsPack(topRatedFilmsListContainer, films.slice(0).sort((a, b) => b.rating - a.rating).slice(0, FILMS_EXTRA_TO_RENDER));

  const mostCommentedFilmsList = new FilmsList(`Most commented`).getElement();
  renderElement(filmsSection, mostCommentedFilmsList);
  const mostCommentedFilmsListContainer = mostCommentedFilmsList.lastElementChild;
  renderFilmsPack(mostCommentedFilmsListContainer, films.slice(0).sort((a, b) => b.comments.length - a.comments.length).slice(0, FILMS_EXTRA_TO_RENDER));
}
