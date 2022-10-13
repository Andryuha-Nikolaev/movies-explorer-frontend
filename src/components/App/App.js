import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import * as movies from '../../utils/MoviesApi';
// import { getCards } from '../../utils/MoviesApi';
// import moviesApi from '../../utils/moviesApi.js';

function App() {
  // const [cards, setCards] = useState([]);

  // function handleSearchMovies(data) {
  //   // setIsLoading(true);
  //   movies
  //     .getCards(data)
  //     .then((data) => {
  //       console.log(data);
  //       setCards(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // .finally(() => {
  //   //   setIsLoading(false);
  //   // });
  // }

  // console.log(cards);

  const [cards, setCards] = useState([]);

  const isLoggedIn = true;

  useEffect(() => {
    if (isLoggedIn) {
      movies
        .getCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route exact path="/">
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/movies">
            <Movies movies={cards} />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
