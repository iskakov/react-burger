import { INGREDIENTS_URL, LOGIN_URL, LOGOUT_URL, MAIL_URL, ORDER_URL, REFRESH_TOKEN_URL, REGISTER_URL, RESET_PASSWORD_URL, USER_URL } from "./constants";
import { getCookie } from "./cookie";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
}
function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

const getIngredientsAPI = () => {
  return request(INGREDIENTS_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const newOrder = (ingredients) => {
  return request(ORDER_URL, {
    method: 'POST',
    body: JSON.stringify(ingredients),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')

    },
  })
}

const loginAPI = (data) => {
  return request(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')

    }
  })
}

const getUserAPI = () => {
  return request(USER_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const updateUserAPI = (data) => {
  return request(USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const registerAPI = (data) => {
  return request(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      
    }
  })
}

const resetPasswordAPI = (data) => {
  return request(RESET_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const logoutAPI = (data) => {
  return request(LOGOUT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const refreshTokenAPI = (data) => {
  return request(REFRESH_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const checkMailAPI = (data) => {
  return request(MAIL_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}


export {
  getIngredientsAPI,
  newOrder,
  loginAPI,
  logoutAPI,
  refreshTokenAPI,
  resetPasswordAPI,
  registerAPI,
  checkMailAPI,
  getUserAPI,
  updateUserAPI
}