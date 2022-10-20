import { checkResponse } from './utils';

// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.movies-explorer.nomorepartiesxyz.ru';

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

// метод делает запрос серверу и получает данные профиля
export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};

// метод изменяет данные профиля на сервере
export const setUserInfo = (data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH', //метод запроса
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }, //заголовки запроса
    body: JSON.stringify({
      //тело запроса
      name: data.name, //в name передаем значение name объекта, переданного в setUserInfo
      email: data.email, //в about передаем значение about объекта, переданного в setUserInfo
    }),
  }).then((res) => checkResponse(res));
};
