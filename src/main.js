import {createUserLevelTemplate} from "./components/user-level";
import {createMainControlTemplate} from "./components/main-control";
import {createSortingControlTemplate} from "./components/sorting-control";
import {createFilmsSectionTemplate} from "./components/films-section";
import {createFilmsListContainerTemplate} from "./components/films-list-container";
import {createFilmCardTemplate} from "./components/film-card";
import {createShowmoreButtonTemplate} from "./components/showmore-button";

const FILMS_TO_RENDER = 5;
const FILMS_EXTRA_TO_RENDER = 2;

const renderElement = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Рендер статуса пользователя
const headerContainer = document.querySelector(`header.header`);
renderElement(headerContainer, createUserLevelTemplate());

const mainContainer = document.querySelector(`main.main`);
renderElement(mainContainer, createMainControlTemplate()); // Рендер главного меню
renderElement(mainContainer, createSortingControlTemplate()); // Рендер панели сортировки
renderElement(mainContainer, createFilmsSectionTemplate()); // Рендер секции с фильмами

// Рендер всех фильмов
const filmsAllContainer = mainContainer.querySelector(`section.films-list`);
renderElement(filmsAllContainer, createFilmsListContainerTemplate()); // Рендер контейнера для всех фильмов
for (let i = 0; i < FILMS_TO_RENDER; i++) {
  renderElement(filmsAllContainer.querySelector(`.films-list__container`), createFilmCardTemplate()); // Рендер карточек фильмов
}

renderElement(filmsAllContainer, createShowmoreButtonTemplate()); // Рендер кнопки Loadmore

// Рендер экстра фильмов
const filmsExtraContainers = mainContainer.querySelectorAll(`section.films-list--extra`);
filmsExtraContainers.forEach((it) => {
  renderElement(it, createFilmsListContainerTemplate());
  for (let i = 0; i < FILMS_EXTRA_TO_RENDER; i++) {
    renderElement(it.querySelector(`.films-list__container`), createFilmCardTemplate()); // Рендер карточек фильмов
  }
});
