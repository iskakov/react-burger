import { API_URL, ORDER_URL } from "./constants";

const getIngredients = () => {
  return fetch(API_URL
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const newOrder = (ingredients) => {
  return fetch(ORDER_URL, {
    method: 'POST',
    body: JSON.stringify(ingredients)
  }).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch((e) => {
    return Promise.reject({error: true, message: e.message})
  });
}

export {
  getIngredients,
  newOrder
}