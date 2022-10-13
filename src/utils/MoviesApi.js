import checkResponse from './utils';

export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export function getCards() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}

// const moviesApi = {
//   getCards() {
//     return fetch('https://api.nomoreparties.co/beatfilm-movies', {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     }).then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(res.status);
//     });
//   },
// };

// export default moviesApi;
