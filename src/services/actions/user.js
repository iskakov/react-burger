import { checkMailAPI, getUserAPI, loginAPI, refreshTokenAPI, registerAPI, resetPasswordAPI, updateUserAPI } from "../../utils/api"
import { getCookie, setCookie } from "../../utils/cookie"

export const TOKEN_LOAD = 'TOKEN_LOAD'
export const RESET_PASSWORD_PRELOAD = 'RESET_PASSWORD_PRELOAD'
export const RESET_PASSWORD_LOAD = 'RESET_PASSWORD_LOAD'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'
export const CLEAR_RESET = 'CLEAR_RESET'
export const MAIL_PRELOAD = 'MAIL_PRELOAD'
export const MAIL_LOAD = 'MAIL_LOAD'
export const MAIL_ERROR = 'MAIL_ERROR'
export const REGISTER_PRELOAD = 'REGISTER_PRELOAD'
export const REGISTER_LOAD = 'REGISTER_LOAD'
export const REGISTER_ERROR = 'REGISTER_ERROR'
export const LOGIN_PRELOAD = 'LOGIN_PRELOAD'
export const LOGIN_LOAD = 'LOGIN_LOAD'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_LOAD = 'LOGOUT_LOAD'

export const USER_PRELOAD = 'LOGIN_PRELOAD'
export const USER_LOAD = 'USER_LOAD'
export const USER_UPDATE = 'USER_UPDATE'
export const USER_ERROR = 'USER_ERROR'

const checkCookie = () => {
  return new Promise((resolve) => {
    if (getCookie('accessToken')) {
      return resolve(true);
    } else {
      if (getCookie('refreshToken')) {
        return refreshTokenAPI({token: getCookie('refreshToken')}).then(res => {
          if (res && res.success) {
            setCookie('accessToken', res.accessToken, {expires: 1200})
            setCookie('refreshToken', res.refreshToken)
            resolve(true);
          }
        })
      }
    }
    return false;
  })
  
}
export const login = (data) => {
  return function(dispatch) {
    dispatch({type: LOGIN_PRELOAD})
    loginAPI(data).then(res => {
      if (res && res.success) {
        dispatch({type: LOGIN_LOAD, payload: res.user})
        setCookie('accessToken', res.accessToken, {expires: 1200})
        setCookie('refreshToken', res.refreshToken)
      } else {
        dispatch({type: LOGIN_ERROR, payload: res.message})
      }
    }).catch((res) => {
      dispatch({type: LOGIN_ERROR, payload: res.message})
    });
  }
}

export const register = (data) => {
  return function(dispatch) {
    dispatch({type: REGISTER_PRELOAD})
    registerAPI(data).then(res => {
      if (res && res.success) {
        dispatch({type: REGISTER_LOAD, payload: res.user})
        setCookie('accessToken', res.accessToken, {expires: 1200})
        setCookie('refreshToken', res.refreshToken)
      } else {
        dispatch({type: REGISTER_ERROR, payload: res.message})
      }
    }).catch((res) => {
      dispatch({type: REGISTER_ERROR, payload: res.message})
    });
  }
}

export const checkEmail = (data) => {
  return function(dispatch) {
    dispatch({type: MAIL_PRELOAD})
    checkMailAPI(data).then(res => {
      if (res && res.success) {
        dispatch({type: MAIL_LOAD})
      } else {
        dispatch({type: MAIL_ERROR, payload: res.message})
      }
    }).catch((res) => {
      dispatch({type: MAIL_ERROR, payload: res.message})
    });
  }
}

export const getUser = () => {
  return function(dispatch) {
    checkCookie().then(() => {
      dispatch({type: USER_PRELOAD})
      getUserAPI().then(res => {
        if (res && res.success) {
          dispatch({type: USER_LOAD, payload: res.user})
        } else {
          dispatch({type: USER_ERROR, payload: res.message})
        }
      }).catch((res) => {
        dispatch({type: USER_ERROR, payload: res.message})
      });
    })
  }
}

export const updateUser = (data) => {
  return function(dispatch) {
    dispatch({type: USER_PRELOAD})
    updateUserAPI(data).then(res => {
      if (res && res.success) {
        dispatch({type: USER_UPDATE, payload: res.user})
      } else {
        dispatch({type: USER_ERROR, payload: res.message})
      }
    }).catch((res) => {
      dispatch({type: USER_ERROR, payload: res.message})
    });
  }
}

export const changePassword = (data) => {
  return function(dispatch) {
    dispatch({type: RESET_PASSWORD_PRELOAD})
    resetPasswordAPI(data).then(res => {
      if (res && res.success) {
        dispatch({type: RESET_PASSWORD_LOAD})
      } else {
        dispatch({type: RESET_PASSWORD_ERROR, payload: res.message})
      }
    }).catch((res) => {
      dispatch({type: RESET_PASSWORD_ERROR, payload: res.message})
    });
  }
}