import FooterStatistic from "./components/footerStatistic";
import {renderElement} from "./utils/render";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import Statistics from "./components/statistics";
import API from "./api";

const AUTHORIZATION = `Basic dCFvgBHnjkjnHBUgy`;
const api = new API(AUTHORIZATION);

const mainContainer = document.querySelector(`main.main`);
const moviesModel = new MoviesModel();
const pageController = new PageController(mainContainer, moviesModel);
const statistics = new Statistics(moviesModel);

mainContainer.addEventListener(`click`, (evt) => {
  switch (evt.target.classList[0]) {
    case `main-navigation__additional`:
      pageController.hide();
      mainContainer.querySelector(`ul.sort`).classList.add(`visually-hidden`);
      statistics.show();
      break;
    case `main-navigation__item`:
      mainContainer.querySelector(`ul.sort`).classList.remove(`visually-hidden`);
      pageController.show();
      statistics.hide();
      break;
  }
});

api.getFilms()
  .then((films) => {
    moviesModel.setMovies(films);

    pageController.render();

    renderElement(mainContainer, statistics);
    statistics.hide();

    renderElement(document.querySelector(`.footer__statistics`), new FooterStatistic(films.length));
  });
