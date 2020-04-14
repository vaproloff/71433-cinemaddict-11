import {createElement} from "../utils";

export default class UserLevel {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._userLevel = ``;

    this._element = null;
    this.updateUserLevel();
  }

  getTemplate() {
    return `
    <section class="header__profile profile">
      <p class="profile__rating">${this._userLevel}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
    `;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  updateUserLevel() {
    if (this._filmsCount > 0 && this._filmsCount <= 10) {
      this._userLevel = `Novice`;
    } else if (this._filmsCount > 10 && this._filmsCount <= 20) {
      this._userLevel = `Fan`;
    } else if (this._filmsCount > 20) {
      this._userLevel = `Movie Buff`;
    }
  }
}
