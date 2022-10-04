import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import account from '../../images/acc-button.svg';
import menu from '../../images/menu-button.svg';

const loggedIn = true;

function Header() {
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
            <Link to="/signup" className="header__button">
              Фильмы
            </Link>
            <Link to="/signin" className="header__button">
              Сохранённые фильмы
            </Link>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img src={account} alt="аккаунт" />
            </Link>
            <button className="header__menu-button">
              <img src={menu} alt="меню" />
            </button>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
