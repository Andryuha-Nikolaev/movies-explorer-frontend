import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ loggedIn, savedMovies, onCardDelete }) {
  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList
        isSavedFilms={true}
        cards={savedMovies}
        savedMovies={savedMovies}
        onCardDelete={onCardDelete}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
