import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMovies, filterDuration } from '../../utils/utils';

import * as movies from '../../utils/MoviesApi';

function Movies({ loggedIn, handleLikeClick, savedMovies, onCardDelete }) {
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  // const [allMovies, setAllMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]); //отфильтрованные по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек

  const [isReqErr, setIsReqErr] = useState(false); //ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены

  //!!!!!!!!!!!
  // function handleSingOut() {
  //   localStorage.removeItem('movies');
  //   localStorage.removeItem('movieSearch');
  //   localStorage.removeItem('shortMovies');
  // }

  //основнай метод фильрации, который отдает массив с фильмами на рендеринг
  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short); //фильтруем полученный массив по запросу
    setInitialMovies(moviesList); //записываем в стейт
    setFilteredMovies(short ? filterDuration(moviesList) : moviesList); //если чекбокс тру, то фильруем по длине и записываем в стейт
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('allMovies', JSON.stringify(movies));
    // setIsNotFound(moviesList.length === 0 ? true : false);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (filterDuration(initialMovies).length === 0) {
        setFilteredMovies(filterDuration(initialMovies));
        // setIsNotFound(true);
      } else {
        setFilteredMovies(filterDuration(initialMovies));
        // setIsNotFound(false);
      }
    } else {
      setFilteredMovies(initialMovies);
      // setIsNotFound(initialMovies.length === 0 ? true : false);
    }
    localStorage.setItem('shortMovies', !isShortMovies);
  }

  //submit
  function onSearchMovies(query) {
    console.log(query);

    localStorage.setItem('movieSearch', query);
    localStorage.setItem('shortMovies', isShortMovies);

    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      console.log('lo');
      handleFilterMovies(movies, query, isShortMovies);
    } else {
      console.log('nolo');
      setIsLoading(true);
      movies
        .getCards()
        .then((cardsData) => {
          handleFilterMovies(cardsData, query, isShortMovies);
          setIsReqErr(false);
          // setAllMovies(cardsData);
        })
        .catch((err) => {
          setIsReqErr(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // if (allMovies.length === 0) {

    // } else {
    //   console.log('lo');
    //   handleFilterMovies(allMovies, query, isShortMovies);
    // }
  }

  useEffect(() => {
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
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
      // setIsNotFound(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        cards={filteredMovies}
        isSavedFilms={false}
        isLoading={isLoading}
        isReqErr={isReqErr}
        isNotFound={isNotFound}
        handleLikeClick={handleLikeClick}
        onCardDelete={onCardDelete}
      />
      <Footer />
    </section>
  );
}

export default Movies;
