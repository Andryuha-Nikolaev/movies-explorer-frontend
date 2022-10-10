import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <h3 className="profile__title">Привет, Виталий!</h3>
      <form className="profile__form">
        <label className="profile__field" htmlFor="name-input">
          Имя
          <input
            name="name"
            className="profile__input"
            id="name-input"
            type="text"
            minLength="2"
            maxLength="40"
            required
          />
        </label>

        <div className="profile__border"></div>
        <label className="profile__field">
          E-mail
          <input name="email" className="profile__input" id="email-input" type="text" required />
        </label>
        <button type="submit" className="profile__button-save">
          Редактировать
        </button>
        <button className="profile__logout">Выйти из аккаунта</button>
      </form>
    </section>
  );
}

export default Profile;
