import Movie from "./models/movie";
import Comment from "./models/comment";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then((films) => {
        return Promise.all(films.map((it) => this._getComments(it.id)))
          .then((comments) => {
            return Movie.parseFilms(films, comments);
          });
      });
  }

  updateFilm(data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${data.id}`, {
      method: `PUT`,
      body: JSON.stringify(Movie.toRaw(data)),
      headers,
    }).then(checkStatus)
      .then((response) => response.json())
      .then((film) => {
        return this._getComments(film.id)
          .then((comments) => {
            return Movie.parseFilm(film, comments);
          });
      });
  }

  postComment(filmId, newCommentData) {
    console.log(`posting`)
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {
      method: `POST`,
      body: JSON.stringify(Comment.toRaw(newCommentData)),
      headers,
    }).then(checkStatus);
  }

  deleteComment(commentId) {
    console.log(`deleting`)
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${commentId}`, {
      method: `DELETE`,
      headers,
    }).then(checkStatus);
  }

  _getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {headers})
      .then(checkStatus)
      .then((response) => response.json());
  }
}
