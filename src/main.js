import {createUserLevel} from "./components/user-level";
import {createMainControl} from "./components/main-control";
import {createSortingControl} from "./components/sorting-control";
import {createFilmsSection} from "./components/films-section";
import {createFilmCard} from "./components/film-card";
import {createShowmoreButton} from "./components/showmore-button";
import {renderElement} from "./utils";
import {generateFilmBase} from "./mocks/film-cards";
// import {createFilmPopup} from "./components/film-popup";

const FILMS_COUNT = Math.round(Math.random() * 5) + 15;
const FILMS_TO_RENDER = 5;
const FILMS_EXTRA_TO_RENDER = 2;

const renderFilmsPack = (container, filmsPack) => {
  filmsPack.forEach((it) => {
    renderElement(container, createFilmCard(it)); // Рендер карточек фильмов
  });
};

const films = generateFilmBase(FILMS_COUNT);
let filmCardsRendered = Math.min(films.length, FILMS_TO_RENDER);

const headerContainer = document.querySelector(`header.header`);
renderElement(headerContainer, createUserLevel(films.filter((it) => it.isWatched).length)); // Рендер статуса пользователя
renderElement(document.querySelector(`.footer__statistics`), `<p>${films.length}</p>`); // Рендер общего кол-ва фильмов

const mainContainer = document.querySelector(`main.main`);
renderElement(mainContainer, createMainControl(films)); // Рендер главного меню
renderElement(mainContainer, createSortingControl()); // Рендер панели сортировки
renderElement(mainContainer, `<section class="films"></section>`); // Рендер секции с фильмами
const filmsSection = mainContainer.querySelector(`section.films`);

// Рендер всех фильмов
renderElement(filmsSection, createFilmsSection());
const allFilmsListContainer = filmsSection.querySelector(`.films-list__container`);
renderFilmsPack(allFilmsListContainer, films.slice(0, FILMS_TO_RENDER));
if (films.length > filmCardsRendered) {
  renderElement(filmsSection.querySelector(`section.films-list`), createShowmoreButton()); // Рендер кнопки Loadmore
  const loadMoreButton = filmsSection.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, () => {
    renderFilmsPack(allFilmsListContainer, films.slice(filmCardsRendered, filmCardsRendered + FILMS_TO_RENDER));
    filmCardsRendered = (filmCardsRendered + FILMS_TO_RENDER) > films.length ? films.length : (filmCardsRendered + FILMS_TO_RENDER);
    if (filmCardsRendered === films.length) {
      loadMoreButton.classList.add(`visually-hidden`);
    }
  });
}

// Рендер Extra фильмов
renderElement(filmsSection, createFilmsSection(`Top rated`));
renderElement(filmsSection, createFilmsSection(`Most commented`));
const topRatedFilmsListContainer = filmsSection.querySelectorAll(`.films-list--extra .films-list__container`)[0];
renderFilmsPack(topRatedFilmsListContainer, films.slice(0).sort((a, b) => b.rating - a.rating).slice(0, FILMS_EXTRA_TO_RENDER));
const mostCommentedFilmsListContainer = filmsSection.querySelectorAll(`.films-list--extra .films-list__container`)[1];
renderFilmsPack(mostCommentedFilmsListContainer, films.slice(0).sort((a, b) => b.comments.length - a.comments.length).slice(0, FILMS_EXTRA_TO_RENDER));

// renderElement(document.querySelector(`body`), createFilmPopup(films[0]));
