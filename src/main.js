import FooterStatistic from "./components/footerStatistic";
import {renderElement} from "./utils/render";
import {generateMovieBase} from "./mocks/film-cards";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";

const FILMS_COUNT = Math.round(Math.random() * 5) + 15;
const films = generateMovieBase(FILMS_COUNT);

renderElement(document.querySelector(`.footer__statistics`), new FooterStatistic(films.length)); // Рендер общего кол-ва фильмов
const mainContainer = document.querySelector(`main.main`);
const moviesModel = new MoviesModel();
moviesModel.setMovies(films);
const pageController = new PageController(mainContainer, moviesModel);
pageController.render();
