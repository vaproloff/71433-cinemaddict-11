import UserLevel from "./components/user-level";
import MainControl from "./components/main-control";
import SortingControl from "./components/sorting-control";
import FilmsSection from "./components/films-section";
import FilmsList from "./components/films-list";
import FilmCard from "./components/film-card";
import FilmPopup from "./components/film-popup";
import ShowmoreButton from "./components/showmore-button";
import FooterStatistic from "./components/footerStatistic";
import {renderElement, removeElement} from "./utils/render";
import {generateFilmBase} from "./mocks/film-cards";

const FILMS_COUNT = Math.round(Math.random() * 5) + 15;
const FILMS_TO_RENDER = 5;
const FILMS_EXTRA_TO_RENDER = 2;

const renderFilm = (container, film) => {
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
};

const renderFilmsPack = (container, filmsPack) => {
  filmsPack.forEach((film) => {
    renderFilm(container, film);
  });
};

const films = generateFilmBase(FILMS_COUNT);
let filmCardsRendered = Math.min(films.length, FILMS_TO_RENDER);

renderElement(document.querySelector(`header.header`), new UserLevel(films.filter((it) => it.isWatched).length)); // Рендер статуса пользователя
renderElement(document.querySelector(`.footer__statistics`), new FooterStatistic(films.length)); // Рендер общего кол-ва фильмов
const mainContainer = document.querySelector(`main.main`);
renderElement(mainContainer, new MainControl(films));
renderElement(mainContainer, new SortingControl());
const filmsSection = new FilmsSection();
renderElement(mainContainer, filmsSection);

if (filmCardsRendered === 0) {
  renderElement(filmsSection.getElement(), new FilmsList(`There are no movies in our database`));
} else {
  // Рендер всех фильмов
  const allFilmsList = new FilmsList();
  renderElement(filmsSection.getElement(), allFilmsList);
  const allFilmsListContainer = allFilmsList.getElement().lastElementChild;
  renderFilmsPack(allFilmsListContainer, films.slice(0, FILMS_TO_RENDER));

  // Рендер кнопки Loadmore
  const loadmoreButton = new ShowmoreButton();
  if (films.length > filmCardsRendered) {
    renderElement(allFilmsList.getElement(), loadmoreButton);
    loadmoreButton.setClickHandler(() => {
      renderFilmsPack(allFilmsListContainer, films.slice(filmCardsRendered, filmCardsRendered + FILMS_TO_RENDER));
      filmCardsRendered = (filmCardsRendered + FILMS_TO_RENDER) > films.length ? films.length : (filmCardsRendered + FILMS_TO_RENDER);
      if (filmCardsRendered === films.length) {
        loadmoreButton.hide();
      }
    });
  }

  // Рендер Extra фильмов
  const topRatedFilmsList = new FilmsList(`Top rated`);
  renderElement(filmsSection.getElement(), topRatedFilmsList);
  const topRatedFilmsListContainer = topRatedFilmsList.getElement().lastElementChild;
  renderFilmsPack(topRatedFilmsListContainer, films.slice(0).sort((a, b) => b.rating - a.rating).slice(0, FILMS_EXTRA_TO_RENDER));

  const mostCommentedFilmsList = new FilmsList(`Most commented`);
  renderElement(filmsSection.getElement(), mostCommentedFilmsList);
  const mostCommentedFilmsListContainer = mostCommentedFilmsList.getElement().lastElementChild;
  renderFilmsPack(mostCommentedFilmsListContainer, films.slice(0).sort((a, b) => b.comments.length - a.comments.length).slice(0, FILMS_EXTRA_TO_RENDER));
}
