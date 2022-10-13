import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearchMovies }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies();
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <label className="search__label" htmlFor="search-input"></label>
        <input
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          required></input>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
