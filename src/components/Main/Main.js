import React from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

function Main() {
  return (
    <main>
      <ScrollToTop />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
