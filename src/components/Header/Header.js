import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import account from '../../images/acc-button.svg';
import menu from '../../images/menu-button.svg';

const loggedIn = true;

function Header() {
  const [isClicked, setIsClicked] = useState(false);

  function handleOpen() {
    setIsClicked(true);
  }

  function handleClose() {
    setIsClicked(false);
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-black">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header" id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <div className="header__button-container_films">
            <Link to="/movies" className="header__button">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__button">
              Сохранённые фильмы
            </Link>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img src={account} alt="аккаунт" />
            </Link>
            <button onClick={handleOpen} className="header__menu-button">
              <img src={menu} alt="меню" />
            </button>
          </div>
          {isClicked ? <Navigation handleClose={handleClose} /> : ''}
        </header>
      )}
    </>
  );
}

export default Header;
