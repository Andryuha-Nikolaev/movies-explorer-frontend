import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import { showMoreDecktop, showMoreTablet, showMoreMobile } from '../../utils/constants';

function MoviesCardList({ cards, isSavedFilms, isLoading, isReqErr, isNotFound }) {
  const [shownMovies, setShownMovies] = useState(0);

  function shownCount() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(16);
    } else if (display > 1023) {
      setShownMovies(12);
    } else if (display > 800) {
      setShownMovies(8);
    } else if (display < 800) {
      setShownMovies(5);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', shownCount);
    }, 500);
  });

  function showMore() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(shownMovies + showMoreDecktop);
    } else if (display > 1023) {
      setShownMovies(shownMovies + showMoreTablet);
    }
    // else if (display > 800) {
    //   setShownMovies(shownMovies + 2);
    // }
    else if (display < 1023) {
      setShownMovies(shownMovies + showMoreMobile);
    }
  }

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
            {cards.slice(0, shownMovies).map((card) => (
              <MoviesCard key={card.id} card={card} isSavedFilms={isSavedFilms} />
            ))}
          </ul>
          <div className="cards__button-container">
            {cards.length > shownMovies ? (
              <button className="cards__button" onClick={showMore}>
                Ещё
              </button>
            ) : (
              ''
            )}

            {/* {isSavedFilms ? (
              ''
            ) : (
              <button className="cards__button" onClick={showMore}>
                Ещё
              </button>
            )} */}
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
