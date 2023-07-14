import { checkMailAPI, getUserAPI, loginAPI, refreshTokenAPI, registerAPI, resetPasswordAPI, updateUserAPI } from "../../utils/api"
import { IUser, TAction } from "../../utils/constants";
import { getCookie, setCookie } from "../../utils/cookie"
import { CLEAR_RESET, LOGIN_ERROR, LOGIN_LOAD, LOGIN_PRELOAD, LOGOUT_LOAD, MAIL_ERROR, MAIL_LOAD, MAIL_PRELOAD, REGISTER_ERROR, REGISTER_LOAD, REGISTER_PRELOAD, RESET_PASSWORD_ERROR, RESET_PASSWORD_LOAD, RESET_PASSWORD_PRELOAD, USER_ERROR, USER_LOAD, USER_PRELOAD, USER_UPDATE } from "../constants/user";
import { AppDispatch, AppThunkAction } from "../store";

export type TUserLoadAction = TAction<typeof USER_LOAD, IUser>;
export type TUserUpdateAction = TAction<typeof USER_UPDATE, IUser>;
export type TUserPreloadAction = TAction<typeof USER_PRELOAD>;
export type TUserErrorAction = TAction<typeof USER_ERROR, string>;
export type TLoginLoadAction = TAction<typeof LOGIN_LOAD, IUser>;
export type TLoginPreloadAction = TAction<typeof LOGIN_PRELOAD>;
export type TLoginErrorAction = TAction<typeof LOGIN_ERROR, string>;
export type TRegisterLoadAction = TAction<typeof REGISTER_LOAD, IUser>;
export type TRegisterPreloadAction = TAction<typeof REGISTER_PRELOAD>;
export type TRegisterErrorAction = TAction<typeof REGISTER_ERROR, string>;
export type TMailLoadAction = TAction<typeof MAIL_LOAD>;
export type TClearResetAction = TAction<typeof CLEAR_RESET>;
export type TLogoutLoadAction = TAction<typeof LOGOUT_LOAD>;
export type TMailPreloadAction = TAction<typeof MAIL_PRELOAD>;
export type TMailErrorAction = TAction<typeof MAIL_ERROR, string>;
export type TResetPasswordLoadAction = TAction<typeof RESET_PASSWORD_LOAD>;
export type TResetPasswordPreloadAction = TAction<typeof RESET_PASSWORD_PRELOAD>;
export type TResetPasswordErrorAction = TAction<typeof RESET_PASSWORD_ERROR, string>;

export type TUserActions = TUserLoadAction | TUserUpdateAction | TUserPreloadAction | TUserErrorAction | TLoginLoadAction | TLoginPreloadAction | TLoginErrorAction
| TRegisterLoadAction | TRegisterPreloadAction | TRegisterErrorAction | TMailLoadAction | TMailPreloadAction | TMailErrorAction | TResetPasswordLoadAction
| TResetPasswordPreloadAction | TResetPasswordErrorAction | TLogoutLoadAction | TClearResetAction;

export const userLoadAction = (user: IUser): TUserLoadAction => ({type: USER_LOAD, payload: user});
export const userUpdateAction = (user: IUser): TUserUpdateAction => ({type: USER_UPDATE, payload: user});
export const userPreloadAction = (): TUserPreloadAction => ({type: USER_PRELOAD});
export const userErrorAction = (message: string): TUserErrorAction => ({type: USER_ERROR, payload: message});
export const loginLoadAction = (user: IUser): TLoginLoadAction => ({type: LOGIN_LOAD, payload: user});
export const loginPreloadAction = (): TLoginPreloadAction => ({type: LOGIN_PRELOAD});
export const loginErrorAction = (message: string): TLoginErrorAction => ({type: LOGIN_ERROR, payload: message});
export const registerLoadAction = (user: IUser): TRegisterLoadAction => ({type: REGISTER_LOAD, payload: user});
export const registerPreloadAction = (): TRegisterPreloadAction => ({type: REGISTER_PRELOAD});
export const registerErrorAction = (message: string): TRegisterErrorAction => ({type: REGISTER_ERROR, payload: message});
export const mailLoadAction = (): TMailLoadAction => ({type: MAIL_LOAD});
export const clearResetAction = (): TClearResetAction => ({type: CLEAR_RESET});
export const logoutLoadAction = (): TLogoutLoadAction => ({type: LOGOUT_LOAD});
export const mailPreloadAction = (): TMailPreloadAction => ({type: MAIL_PRELOAD});
export const mailErrorAction = (message: string): TMailErrorAction => ({type: MAIL_ERROR, payload: message});
export const resetPasswordLoadAction = (): TResetPasswordLoadAction => ({type: RESET_PASSWORD_LOAD});
export const resetPasswordPreloadAction = (): TResetPasswordPreloadAction => ({type: RESET_PASSWORD_PRELOAD});
export const resetPasswordErrorAction = (message: string): TResetPasswordErrorAction => ({type: RESET_PASSWORD_ERROR, payload: message});

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
    return resolve(false);
  })
  
}
export const login = (data): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    dispatch(loginPreloadAction())
    loginAPI(data).then(res => {
      if (res && res.success) {
        dispatch(loginLoadAction(res.user))
        setCookie('accessToken', res.accessToken, {expires: 1200})
        setCookie('refreshToken', res.refreshToken)
      } else {
        dispatch(loginErrorAction(res.message))
      }
    }).catch((res) => {
      dispatch(loginErrorAction(res.message))
    });
  }
}

export const register = (data): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    dispatch(registerPreloadAction())
    registerAPI(data).then(res => {
      if (res && res.success) {
        dispatch(registerLoadAction(res.user))
        setCookie('accessToken', res.accessToken, {expires: 1200})
        setCookie('refreshToken', res.refreshToken)
      } else {
        dispatch(registerErrorAction(res.message))
      }
    }).catch((res) => {
      dispatch(registerErrorAction(res.message))
    });
  }
}

export const checkEmail = (data): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    dispatch(mailPreloadAction())
    checkMailAPI(data).then(res => {
      if (res && res.success) {
        dispatch(mailLoadAction())
      } else {
        dispatch(mailErrorAction(res.message))
      }
    }).catch((res) => {
      dispatch(mailErrorAction(res.message))
    });
  }
}

export const getUser = (): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    checkCookie().then(() => {
      dispatch(userPreloadAction())
      getUserAPI().then(res => {
        if (res && res.success) {
          dispatch(userLoadAction(res.user))
        } else {
          dispatch(userErrorAction(res.message))
        }
      }).catch((res) => {
        dispatch(userErrorAction(res.message))
      });
    })
  }
}

export const updateUser = (data): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    dispatch(userPreloadAction())
    updateUserAPI(data).then(res => {
      if (res && res.success) {
        dispatch(userUpdateAction(res.user))
      } else {
        dispatch(userErrorAction(res.message))
      }
    }).catch((res) => {
      dispatch(userErrorAction(res.message))
    });
  }
}

export const changePassword = (data): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    dispatch(resetPasswordPreloadAction())
    resetPasswordAPI(data).then(res => {
      if (res && res.success) {
        dispatch(resetPasswordLoadAction())
      } else {
        dispatch(resetPasswordErrorAction(res.message))
      }
    }).catch((res) => {
      dispatch(resetPasswordErrorAction(res.message))
    });
  }
}