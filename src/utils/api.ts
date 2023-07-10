import { IBurgerType, ICheckEmail, INGREDIENTS_URL, IOrder, IResetPassword, IToken, IUser, LOGIN_URL, LOGOUT_URL, MAIL_URL, ORDER_URL, REFRESH_TOKEN_URL, REGISTER_URL, RESET_PASSWORD_URL, TResponseBody, USER_URL,  } from "./constants";
import { getCookie } from "./cookie";
type TBurger = Promise<TResponseBody<'data', Array<IBurgerType>>> ;
type TOrder = Promise<TResponseBody<'order', IOrder>> ;
type TUser = Promise<TResponseBody<'user', IUser>> ;
type TResponse = TBurger | TOrder | TUser;
type TBody = Promise<TResponseBody>;
const checkResponse = (res: Response): TResponse  => {
  return res.ok ? res.json() : res.json().then((err: Error): TBody  => Promise.reject({error: true, message: err.message}))
}

const request = (url: RequestInfo, options?: RequestInit): TResponse   => fetch(url, options).then(checkResponse).catch((err: Error): TBody  => Promise.reject({error: true, message: err.message}))

const getIngredientsAPI = (): TBurger => {
  return request(INGREDIENTS_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const newOrder = (ingredients: Array<string>): Promise<TResponseBody<'order', IOrder>>  => {
  return request(ORDER_URL, {
    method: 'POST',
    body: JSON.stringify(ingredients),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    },
  })
}

const loginAPI = (data: IUser): TUser => {
  return request(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const getUserAPI = (): TUser  => {
  return request(USER_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const updateUserAPI = (data: IUser): TUser  => {
  return request(USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const registerAPI = (data: IUser): TUser  => {
  return request(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      
    }
  })
}

const resetPasswordAPI = (data: IResetPassword): TBody  => {
  return request(RESET_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const logoutAPI = (data: IToken): TBody  => {
  return request(LOGOUT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const refreshTokenAPI = (data: IToken): TBody => {
  return request(REFRESH_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const checkMailAPI = (data: ICheckEmail): TBody => {
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