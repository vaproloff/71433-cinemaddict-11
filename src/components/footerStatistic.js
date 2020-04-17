import AbstractComponent from "./abstract-component";

export default class FooterStatistic extends AbstractComponent{
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return `
    <p>${this._filmsCount}</p>
    `;
  }
}
