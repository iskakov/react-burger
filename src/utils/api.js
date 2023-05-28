import { INGREDIENTS_URL, INGREDIENT_URL, LOGIN_URL, LOGOUT_URL, MAIL_URL, ORDER_URL, REFRESH_TOKEN_URL, REGISTER_URL, RESET_PASSWORD_URL, USER_URL } from "./constants";
import { getCookie } from "./cookie";

const getIngredientsAPI = () => {
  return fetch(INGREDIENTS_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const getIngredientAPI = (id) => {
  return fetch(`${INGREDIENT_URL}/${id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}


const newOrder = (ingredients) => {
  return fetch(ORDER_URL, {
    method: 'POST',
    body: JSON.stringify(ingredients),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')

    },
  }).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch((e) => {
    return Promise.reject({error: true, message: e.message})
  });
}

const loginAPI = (data) => {
  return fetch(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')

    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const getUserAPI = () => {
  return fetch(USER_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const updateUserAPI = (data) => {
  return fetch(USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const registerAPI = (data) => {
  return fetch(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      
    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const resetPasswordAPI = (data) => {
  return fetch(RESET_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const logoutAPI = (data) => {
  return fetch(LOGOUT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => {
      return res.ok;
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const refreshTokenAPI = (data) => {
  return fetch(REFRESH_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}

const checkMailAPI = (data) => {
  return fetch(MAIL_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  }
    ).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject({error: true, message: err.message}))
  }).catch(() => {
    return Promise.reject({error: true, message: 'Проверьте правильность запроса'})
  });
}


export {
  getIngredientsAPI,
  getIngredientAPI,
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