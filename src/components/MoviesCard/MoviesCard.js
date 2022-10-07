import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card }) {
  const cardSaveButtonClassName = `${
    card.saved ? 'card__save-button card__save-button_active' : 'card__save-button'
  }`;

  return (
    <li className="card">
      <img className="card__image" alt={card.name} src={card.image} />
      <div className="card__container">
        <div className="card__info-container">
          <h2 className="card__text">{card.name}</h2>
          <span className="card__time">{card.time}</span>
        </div>
        <button className={cardSaveButtonClassName}></button>
      </div>
    </li>
  );
}

export default MoviesCard;
