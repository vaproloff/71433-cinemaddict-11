import {createUserLevelTemplate} from "./components/user-level";
import {createMainControlTemplate} from "./components/main-control";
import {createSortingControlTemplate} from "./components/sorting-control";
import {createFilmsSectionTemplate} from "./components/films-section";
import {createFilmsListContainerTemplate} from "./components/films-list-container";
import {createFilmCard} from "./components/film-card";
import {createShowmoreButtonTemplate} from "./components/showmore-button";
import {renderElement} from "./utils";
import {generateFilmBase} from "./mocks/film-cards";

const FILMS_COUNT = 30;
const FILMS_TO_RENDER = 5;
const FILMS_EXTRA_TO_RENDER = 2;

// Рендер статуса пользователя
const headerContainer = document.querySelector(`header.header`);
renderElement(headerContainer, createUserLevelTemplate());

const mainContainer = document.querySelector(`main.main`);
renderElement(mainContainer, createMainControlTemplate()); // Рендер главного меню
renderElement(mainContainer, createSortingControlTemplate()); // Рендер панели сортировки
renderElement(mainContainer, createFilmsSectionTemplate()); // Рендер секции с фильмами

// Рендер всех фильмов
const films = generateFilmBase(FILMS_COUNT);

console.log(films);

const filmsAllContainer = mainContainer.querySelector(`section.films-list`);
renderElement(filmsAllContainer, createFilmsListContainerTemplate()); // Рендер контейнера для всех фильмов

films.slice(0, FILMS_TO_RENDER).forEach((it) => {
  renderElement(filmsAllContainer.querySelector(`.films-list__container`), createFilmCard(it)); // Рендер карточек фильмов
});

renderElement(filmsAllContainer, createShowmoreButtonTemplate()); // Рендер кнопки Loadmore

// Рендер экстра фильмов
const filmsExtraContainers = mainContainer.querySelectorAll(`section.films-list--extra`);
filmsExtraContainers.forEach((it) => {
  renderElement(it, createFilmsListContainerTemplate());
  for (let i = 0; i < FILMS_EXTRA_TO_RENDER; i++) {
    renderElement(it.querySelector(`.films-list__container`), createFilmCard(films[0])); // Рендер карточек фильмов
  }
});
