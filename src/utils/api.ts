import { IBurgerType, ICheckEmail, INGREDIENTS_URL, IOrder, IResetPassword, IToken, IUser, LOGIN_URL, LOGOUT_URL, MAIL_URL, ORDER_URL, REFRESH_TOKEN_URL, REGISTER_URL, RESET_PASSWORD_URL, TResponseBody, USER_URL,  } from "./constants";
import { getCookie } from "./cookie";

const checkResponse = (res: Response): Promise<TResponseBody<'data', Array<IBurgerType>>>  | Promise<TResponseBody<'order', IOrder>> | Promise<TResponseBody<'user', IUser>>  => {
  return res.ok ? res.json() : res.json().then((err: Error): Promise<TResponseBody>  => Promise.reject({error: true, message: err.message}))
}

const request = (url: RequestInfo, options?: RequestInit):
| Promise<TResponseBody<'data', Array<IBurgerType>>> | Promise<TResponseBody<'order', IOrder>> |  Promise<TResponseBody<'user', IUser>>   => fetch(url, options).then(checkResponse).catch((err: Error): Promise<TResponseBody>  => Promise.reject({error: true, message: err.message}))

const getIngredientsAPI = (): Promise<TResponseBody<'data', Array<IBurgerType>>> => {
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

const loginAPI = (data: IUser): Promise<TResponseBody<'user', IUser>> => {
  return request(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const getUserAPI = (): Promise<TResponseBody<'user', IUser>>  => {
  return request(USER_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const updateUserAPI = (data: IUser): Promise<TResponseBody<'user', IUser>>  => {
  return request(USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('accessToken')
    }
  })
}

const registerAPI = (data: IUser): Promise<TResponseBody<'user', IUser>>  => {
  return request(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      
    }
  })
}

const resetPasswordAPI = (data: IResetPassword): Promise<TResponseBody>  => {
  return request(RESET_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const logoutAPI = (data: IToken): Promise<TResponseBody>  => {
  return request(LOGOUT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const refreshTokenAPI = (data: IToken): Promise<TResponseBody> => {
  return request(REFRESH_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const checkMailAPI = (data: ICheckEmail): Promise<TResponseBody> => {
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