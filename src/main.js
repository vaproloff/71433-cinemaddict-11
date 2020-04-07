import {createUserLevel} from "./components/user-level";
import {createMainControl} from "./components/main-control";
import {createSortingControl} from "./components/sorting-control";
import {createFilmsSection} from "./components/films-section";
import {createFilmCard} from "./components/film-card";
import {createShowmoreButton} from "./components/showmore-button";
import {renderElement} from "./utils";
import {generateFilmBase} from "./mocks/film-cards";
// import {createFilmPopup} from "./components/film-popup";

const FILMS_COUNT = 30;
const FILMS_TO_RENDER = 5;
const FILMS_EXTRA_TO_RENDER = 2;

// Рендер статуса пользователя
const headerContainer = document.querySelector(`header.header`);
renderElement(headerContainer, createUserLevel());

const mainContainer = document.querySelector(`main.main`);
renderElement(mainContainer, createMainControl()); // Рендер главного меню
renderElement(mainContainer, createSortingControl()); // Рендер панели сортировки
renderElement(mainContainer, `<section class="films"></section>`); // Рендер секции с фильмами
const filmsSection = mainContainer.querySelector(`section.films`);

const films = generateFilmBase(FILMS_COUNT);

// Рендер всех фильмов
renderElement(filmsSection, createFilmsSection());
const allFilmsListContainer = filmsSection.querySelector(`.films-list__container`);
films.slice(0, FILMS_TO_RENDER).forEach((it) => {
  renderElement(allFilmsListContainer, createFilmCard(it)); // Рендер карточек фильмов
});
renderElement(filmsSection.querySelector(`section.films-list`), createShowmoreButton()); // Рендер кнопки Loadmore

// Рендер Top rated фильмов
renderElement(filmsSection, createFilmsSection(`Top rated`));
renderElement(filmsSection, createFilmsSection(`Most commented`));
const topRatedFilmsListContainer = filmsSection.querySelectorAll(`.films-list--extra .films-list__container`)[0];
films.slice(0).sort((a, b) => b.rating - a.rating).slice(0, FILMS_EXTRA_TO_RENDER).forEach((it) => {
  renderElement(topRatedFilmsListContainer, createFilmCard(it)); // Рендер карточек фильмов
});
const mostCommentedFilmsListContainer = filmsSection.querySelectorAll(`.films-list--extra .films-list__container`)[1];
films.slice(0).sort((a, b) => b.comments.length - a.comments.length).slice(0, FILMS_EXTRA_TO_RENDER).forEach((it) => {
  renderElement(mostCommentedFilmsListContainer, createFilmCard(it)); // Рендер карточек фильмов
});

// renderElement(document.querySelector(`body`), createFilmPopup(films[0]));
