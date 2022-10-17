import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {
  const [query, setQuery] = useState('');

  function handleChangeQuery(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies(query);
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
          onChange={handleChangeQuery}
          value={query || ''}></input>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies} />
    </section>
  );
}

export default SearchForm;
