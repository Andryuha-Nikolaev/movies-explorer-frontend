import React from 'react';
import { durationConverter } from '../../utils/utils';
import './MoviesCard.css';

function MoviesCard({ card, isSavedFilms }) {
  const cardSaveButtonClassName = `${
    card.saved ? 'card__save-button card__save-button_active' : 'card__save-button'
  }`;

  return (
    <li className="card">
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="card__image"
          alt={card.nameRU}
          src={`https://api.nomoreparties.co/${card.image.url}`}
        />
      </a>

      <div className="card__container">
        <div className="card__info-container">
          <h2 className="card__text">{card.nameRU}</h2>
          <span className="card__time">{durationConverter(card.duration)}</span>
        </div>
        {isSavedFilms ? (
          <button className="card__delete-button"></button>
        ) : (
          <button className={cardSaveButtonClassName}></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
