import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // const [profileName, setProfileName] = useState('');
  //Проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            // setProfileName(res.name);
          }
          // history.push('/movies');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

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

      // api.getCards().then((cardsData) => {
      //   setCards(cardsData)
      // })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    }
  }, [isLoggedIn, history]);

  console.log(currentUser);

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
    // setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        // closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  }

  // Выход
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    // history.push('/signin');
    history.push('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route exact path="/">
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
            <Route path="/movies">
              <Movies loggedIn={isLoggedIn} />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies loggedIn={isLoggedIn} />
            </Route>
            <Route path="/profile">
              <Header loggedIn={isLoggedIn} />
              <Profile signOut={handleSignOut} onUpdateUser={handleUpdateUser} />
            </Route>
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
