import React from 'react';
import './InfoTooltip.css';
// import unsuccessImage from '../../images/unsuccess-image.svg';

function InfoTooltip({ onClose, isSuccess, isUpdate }) {
  return (
    <div className={`popup ${!isSuccess ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          id="success-close-button"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        {/* <img className="popup__signup-image" src={unsuccessImage} alt="Что-то пошло не так" /> */}
        <h2 className="popup__signup-title">{`${
          isUpdate ? 'Редактирование прошло успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'
        }`}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
