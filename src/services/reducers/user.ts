import { IUser } from "../../utils/constants";
import { TUserActions } from "../actions/user";
import { LOGIN_ERROR, LOGIN_LOAD, LOGIN_PRELOAD, LOGOUT_LOAD, MAIL_ERROR, MAIL_LOAD, MAIL_PRELOAD, REGISTER_ERROR, REGISTER_LOAD, REGISTER_PRELOAD, RESET_PASSWORD_ERROR, RESET_PASSWORD_LOAD, RESET_PASSWORD_PRELOAD, USER_ERROR, USER_LOAD, USER_PRELOAD, USER_UPDATE } from "../constants/user";

interface IUserType {
  user: IUser;
  mail: boolean;
  password: boolean;
  preload: boolean;
  mailError: boolean;
  loginError: boolean;
  registerError: boolean;
  resetError: boolean;
  userError: boolean;
  errorMessage: string;
}


const initialState: IUserType = {
  user: null,
  mail: false,
  password: false,
  preload: false,
  mailError: false,
  loginError: false,
  registerError: false,
  resetError: false,
  userError: false,
  errorMessage: ''
}

export const userReducer = (state: IUserType = initialState, action: TUserActions) => {
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