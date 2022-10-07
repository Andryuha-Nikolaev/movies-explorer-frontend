import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <section className="movies">
      <Header />
      <SearchForm />
      <h1>SavedMovies!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
      <MoviesCardList />
      <Footer />
    </section>
  );
}

export default SavedMovies;
