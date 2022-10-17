import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, isSavedFilms }) {
  if (cards.length > 0) {
    console.log('yes');
  } else {
    console.log('no');
  }
  return (
    <>
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard key={card.id} card={card} isSavedFilms={isSavedFilms} />
        ))}
      </ul>
      <div className="cards__button-container">
        {isSavedFilms ? '' : <button className="cards__button">Ещё</button>}
      </div>
    </>
  );
}

export default MoviesCardList;
