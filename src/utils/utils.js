import { shorts } from './constants';

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json(); //если да, то возвращает полученные данные
  }
  return Promise.reject(`Error: ${res.status}`); //иначе возвращает ошибку
};

//фильтр по запросу
export function filterMovies(movies, query) {
  // console.log(movies);
  const moviesByQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
  });
  return moviesByQuery;
}

// , shortMoviesCheckbox

//фильтр по длительности
export function filterDuration(movies) {
  return movies.filter((movie) => movie.duration < shorts);
}
