import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import account from '../../images/acc-button.svg';
import menu from '../../images/menu-button.svg';

function Header({ loggedIn }) {
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
            <NavLink
              to="/movies"
              className="header__button"
              activeClassName="header__button_active">
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="header__button"
              activeClassName="header__button_active">
              Сохранённые фильмы
            </NavLink>
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
