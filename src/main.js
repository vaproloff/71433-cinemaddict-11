import UserLevel from "./components/user-level";
import FooterStatistic from "./components/footerStatistic";
import {renderElement} from "./utils/render";
import {generateFilmBase} from "./mocks/film-cards";
import PageController from "./controllers/page-controller";

const FILMS_COUNT = Math.round(Math.random() * 5) + 15;
const films = generateFilmBase(FILMS_COUNT);

renderElement(document.querySelector(`header.header`), new UserLevel(films.filter((it) => it.isWatched).length)); // Рендер статуса пользователя
renderElement(document.querySelector(`.footer__statistics`), new FooterStatistic(films.length)); // Рендер общего кол-ва фильмов
const mainContainer = document.querySelector(`main.main`);
const pageController = new PageController(mainContainer, films);
pageController.renderMain();
