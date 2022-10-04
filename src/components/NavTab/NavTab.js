import React from 'react';
import './NavTab.css';
import { Link } from 'react-scroll';

function NavTab() {
  return (
    <nav className="nav-tab">
      <Link to="about" className="nav-tab__link" smooth={true} duration={600}>
        О проекте
      </Link>
      <Link to="techs" className="nav-tab__link" smooth={true} duration={600}>
        Технологии
      </Link>
      <Link to="about-me" className="nav-tab__link" smooth={true} duration={600}>
        Студент
      </Link>
    </nav>
  );
}

export default NavTab;
