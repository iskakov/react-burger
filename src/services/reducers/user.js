import { checkMailAPI, getUserAPI, loginAPI, logoutAPI, refreshTokenAPI, registerAPI, resetPasswordAPI, updateUserAPI } from "../../utils/api";
import { getCookie, setCookie } from "../../utils/cookie";
import { CLEAR_RESET, LOGIN_ERROR, LOGIN_LOAD, LOGIN_PRELOAD, LOGOUT_LOAD, MAIL_ERROR, MAIL_LOAD, MAIL_PRELOAD, REGISTER_ERROR, REGISTER_LOAD, REGISTER_PRELOAD, RESET_PASSWORD_ERROR, RESET_PASSWORD_LOAD, RESET_PASSWORD_PRELOAD, RESET_PASSWORD_STATUS, TOKEN_ERROR, TOKEN_PRELOAD, USER_ERROR, USER_LOAD, USER_PRELOAD, USER_UPDATE } from "../actions/user";
const initialState = {
  user: null,
  mail: false,
  password: false,
  preload: false,
  mailError: false,
  passwordError: false,
  loginError: false,
  registerError: false,
  refreshError: false,
  resetError: false,
  userError: false,
  errorMessage: ''
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case MAIL_PRELOAD:
    case USER_PRELOAD:
    case LOGIN_PRELOAD: 
    case REGISTER_PRELOAD: 
    case RESET_PASSWORD_PRELOAD:
      return {...state, preload: true}
    case REGISTER_LOAD:
      return {...state, preload: false, registerError: false, user: action.payload}
    case LOGIN_LOAD: 
      return {...state, preload: false, loginError: false, user: action.payload}
    case USER_LOAD:
    case USER_UPDATE:
      return {...state, preload: false, userError: false, user: action.payload}
    case LOGOUT_LOAD:
      return {...state, preload: false, user: null}
    case MAIL_LOAD: 
      return {...state, preload: false, mailError: false, mail: true}
    case RESET_PASSWORD_LOAD: 
      return {...state, preload: false, resetError: false, password: true}
    case CLEAR_RESET: 
      return {...state, password: false, mail: false, resetStatus: false}
    case REGISTER_ERROR:
      return {...state, preload: false, registerError: true, errorMessage: action.payload}
    case USER_ERROR:
      return {...state, preload: false, userError: true, errorMessage: action.payload}
    case RESET_PASSWORD_ERROR: 
      return {...state, preload: false, resetError: true, errorMessage: action.payload}
    case MAIL_ERROR:
      return {...state, preload: false, mailError: true, errorMessage: action.payload}
    case LOGIN_ERROR: 
      return {...state, preload: false, loginError: true, errorMessage: action.payload}
    default: 
      return state;
  }
}
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



