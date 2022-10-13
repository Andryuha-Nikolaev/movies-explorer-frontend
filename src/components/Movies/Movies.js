import React, { useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import * as movies from '../../utils/MoviesApi';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  function onSearchMovies() {
    setIsLoading(true);
    movies
      .getCards()
      .then((cardsData) => {
        setAllMovies(cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <section className="movies">
      <Header />
      <SearchForm onSearchMovies={onSearchMovies} />
      <MoviesCardList cards={allMovies} isSavedFilms={false} isLoading={isLoading} />
      <Footer />
    </section>
  );
}

export default Movies;
