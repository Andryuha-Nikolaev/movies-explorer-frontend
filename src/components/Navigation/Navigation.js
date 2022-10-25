import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import account from '../../images/acc-button.svg';

function Navigation({ handleClose }) {
  return (
    <div className="navigation__overlay">
      <div onClick={handleClose} className="navigation__container-empty"></div>
      <div className="navigation__container">
        <button className="navigation__close-button" onClick={handleClose}></button>
        <nav className="navigation__nav">
          <NavLink
            exact
            to="/"
            onClick={handleClose}
            className="navigation__link"
            activeClassName="navigation__link_active">
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            onClick={handleClose}
            className="navigation__link"
            activeClassName="navigation__link_active">
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={handleClose}
            className="navigation__link"
            activeClassName="navigation__link_active">
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" onClick={handleClose} className="navigation__account-button">
          <img src={account} alt="аккаунт" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
