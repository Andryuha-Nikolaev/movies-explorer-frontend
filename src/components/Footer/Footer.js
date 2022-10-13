import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__author">&copy; 2022 Андрей Николаев</p>
        <a
          href="https://practicum.yandex.ru"
          className="footer__link"
          target="_blank"
          rel="noreferrer">
          Яндекс.Практикум
        </a>
        <a
          href="https://github.com/Andryuha-Nikolaev"
          className="footer__link"
          target="_blank"
          rel="noreferrer">
          Github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
