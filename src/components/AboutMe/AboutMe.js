import React from 'react';
import photo from '../../images/myphoto.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__content">
          <h3 className="about-me__large-title">Андрей</h3>
          <p className="about-me__info">Фронтенд-разработчик, 29 лет</p>
          <p className="about-me__description">
            Живу и работаю в Калуге, закончил факультет истории и права КГУ. Люблю хоккей, футбол,
            велосипед и пешие прогулки. Благодаря курсу Веб-разработчик в Яндекс Практикуме,
            убедился, что мне интересна разработка. Хочу развиваться в этом направлении, постоянно
            расширяя и углубляя свои знания.
          </p>
          <a
            href="https://github.com/Andryuha-Nikolaev"
            className="about-me__link"
            target="_blank"
            rel="noreferrer">
            Github
          </a>
        </div>
        <img src={photo} alt="фото" className="about-me__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
