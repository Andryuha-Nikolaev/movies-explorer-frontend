import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMovies, filterDuration } from '../../utils/utils';

import * as movies from '../../utils/MoviesApi';

function Movies() {
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  // const [allMovies, setAllMovies] = useState([]); //все фильмы с сервера
  const [initialMovies, setInitialMovies] = useState([]); //отфильтрованные по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек

  //основнай метод фильрации, который отдает массив с фильмами на рендеринг
  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short); //фильтруем полученный массив по запросу
    setInitialMovies(moviesList); //записываем в стейт
    setFilteredMovies(short ? filterDuration(moviesList) : moviesList); //если чекбокс тру, то фильруем по длине и записываем в стейт
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      // setFilteredMovies(filterDuration(initialMovies));
      if (filterDuration(initialMovies).length === 0) {
        setFilteredMovies(filterDuration(initialMovies));
      } else {
        setFilteredMovies(filterDuration(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !isShortMovies);
  }

  //submit
  function onSearchMovies(query) {
    console.log(query);
    setIsLoading(true);

    localStorage.setItem('movieSearch', query);
    localStorage.setItem('shortMovies', isShortMovies);

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

  useEffect(() => {
    // console.log(localStorage.getItem('shortMovies'));
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (isShortMovies) {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
    // else {

    // }
  }, [isShortMovies]);

  return (
    <section className="movies">
      <Header />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList cards={filteredMovies} isSavedFilms={false} isLoading={isLoading} />
      <Footer />
    </section>
  );
}

export default Movies;
