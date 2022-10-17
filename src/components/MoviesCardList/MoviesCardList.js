import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';

function MoviesCardList({ cards, isSavedFilms, isLoading, isReqErr, isNotFound }) {
  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />}
      {isReqErr && !isLoading && (
        <SearchError
          errorText={
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          }
        />
      )}
      {!isLoading && !isReqErr && !isNotFound && (
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
      )}
    </section>
  );
}

export default MoviesCardList;
