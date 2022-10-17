import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import { filterMovies, filterDuration } from '../../utils/utils';

import * as movies from '../../utils/MoviesApi';

function Movies() {
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  // const [allMovies, setAllMovies] = useState([]); //все фильмы с сервера
  const [initialMovies, setInitialMovies] = useState([]); //отфильтрованные по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isQueryError, setIsQueryError] = useState(false);
  // const [isNotFound, setIsNotFound] = useState(false);
  // const [errorText, setErrorText] = useState('');
  const [nothingFound, setNothingFound] = useState(false);

  //основнай метод фильрации, который отдает массив с фильмами на рендеринг
  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short); //фильтруем полученный массив по запросу
    // moviesList.length === 0 ? setNothingFound(true) : setNothingFound(false);
    setInitialMovies(moviesList); //записываем в стейт
    setFilteredMovies(short ? filterDuration(moviesList) : moviesList); //если чекбокс тру, то фильруем по длине и записываем в стейт
    setIsQueryError(false);
    setNothingFound(moviesList.length === 0 ? true : false);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    setNothingFound(false);
    setIsQueryError(false);
    if (!isShortMovies) {
      if (filterDuration(initialMovies).length === 0) {
        setFilteredMovies(filterDuration(initialMovies));
        setNothingFound(true);
        // filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      } else {
        setFilteredMovies(filterDuration(initialMovies));
        setNothingFound(false);
        // filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      }
    } else {
      initialMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      setFilteredMovies(initialMovies);
    }
  }

  function onSearchMovies(query) {
    setNothingFound(false);
    // setIsNotFound(false);
    if (query.trim().length === 0) {
      // setErrorText('Нужно ввести ключевое слово');
      setIsQueryError(true); //пустой ввод
      return;
    } else {
      setIsQueryError(false); //есть ввод
      setIsLoading(true);
      movies
        .getCards()
        .then((cardsData) => {
          // setAllMovies(cardsData);
          handleFilterMovies(cardsData, query, isShortMovies);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <section className="movies">
      <Header />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        isShortMovies={isShortMovies}
      />
      <div className="cards">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {/* {filteredMovies.length === 0 && <SearchError errorText={'Ничего не найдено'} />} */}
            {isQueryError && <SearchError errorText={'Нужно ввести ключевое слово'} />}
            {nothingFound && <SearchError errorText={'Ничего не найдено'} />}
            {/* {isQueryError && filteredMovies.length === 0 && <SearchError errorText={''} />} */}

            {!nothingFound && !isQueryError && (
              <MoviesCardList cards={filteredMovies} isSavedFilms={false} isLoading={isLoading} />
            )}
          </>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Movies;
