import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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

import CurrentUserContext from '../../contexts/CurrentUserContext';

import * as api from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isAddMovie, setIsAddMovie] = useState(false);
  const path = location.pathname;
  // const [profileName, setProfileName] = useState('');
  //Проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    // history.push(path);
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            // setProfileName(res.name);
          }
          // history.push(path);
          // history.push('/movies');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // useEffect(() => {
  //   history.push(path);
  // }, [path, history]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);

          history.push('/movies');
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getCards()
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse());

          // console.log(currentUser);
          // setSavedMovies(cardsData.reverse());
          // setIsReqErr(false);
        })
        .catch((err) => {
          // setIsReqErr(true);
          console.log(err);
        });

      // api.getCards().then((cardsData) => {
      //   setCards(cardsData)
      // })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    }
  }, [isLoggedIn, history]);

  // const savedMovies = allSavedMovies.filter((movie) => movie.owner === currentUser._id);
  // [isLoggedIn, history]

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  // function getUserInfo() {
  //   const jwt = localStorage.getItem('jwt');
  //   const path = location.pathname;
  //   // history.push(path);
  //   if (jwt) {
  //     api
  //       .getContent(jwt)
  //       .then((res) => {
  //         setCurrentUser(res);
  //         setIsLoggedIn(true);
  //         // history.push(path);
  //         // setProfileName(res.name);
  //         history.push(path);
  //         // history.push('/movies');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  // useEffect(() => {
  //   const path = location.pathname;
  //   history.push(path);
  // }, [history, location.pathname]);

  // function handleLocation() {
  //   const path = location.pathname;
  //   history.push(path);
  // }

  //регистрация пользователя
  function handleRegister({ name, email, password }) {
    api
      .register(name, email, password)
      .then((res) => {
        if (res) {
          console.log('успех!!!!!!!!!!!!');
          console.log(res);
          // setIsSuccess(true);
          // setIsInfoTooltipPopupOpen(true);
          // history.push('./signin');
        }
      })
      .then(() => {
        handleAuthorize({ email, password });
      })
      .catch((err) => {
        // setIsSuccess(false);
        // setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  //авторизация пользователя
  function handleAuthorize({ email, password }) {
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          console.log(res.token);
          history.push('./movies');
        }
      })
      .catch((err) => {
        // setIsSuccess(false);
        // setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleUpdateUser(newUserInfo) {
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    api
      .postCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const savedMovie = savedMovies.find((item) => {
      if (item.movieId === card.id || item.movieId === card.movieId) {
        return item;
      } else {
        return savedMovies;
      }
    });
    api
      .deleteCard(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((item) => {
          if (card.id === item.movieId || card.movieId === item.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Выход
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    // history.push('/signin');
    localStorage.removeItem('movies');
    localStorage.removeItem('movieSearch');
    localStorage.removeItem('shortMovies');
    history.push('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/" exact>
              <Header loggedIn={isLoggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route path="/signin">
              <Login onAuthorize={handleAuthorize} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <ProtectedRoute
              path="/movies"
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              onCardDelete={handleCardDelete}
              component={Movies}
              handleLikeClick={handleCardLike}></ProtectedRoute>
            <ProtectedRoute
              path="/saved-movies"
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              onCardDelete={handleCardDelete}
              component={SavedMovies}></ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              signOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
              loggedIn={isLoggedIn}
              component={Profile}></ProtectedRoute>

            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
