import { API_URL } from "./constants";

const getIngredients = () => {
  return fetch(API_URL
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

export {
  getIngredients
}