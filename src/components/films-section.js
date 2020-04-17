import AbstractComponent from "./abstract-component";

export default class FilmsSection extends AbstractComponent{
  getTemplate() {
    return `
    <section class="films"></section>
    `;
  }
}
