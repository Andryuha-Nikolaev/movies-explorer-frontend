import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <label className="search__label" htmlFor="search-input"></label>
        <input className="search__input" id="search-input" type="text" placeholder="Фильм"></input>
        <button className="search__button"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
