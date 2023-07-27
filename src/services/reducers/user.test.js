import { UserObject } from '../../utils/constants-test';
import { loginErrorAction, loginLoadAction, loginPreloadAction, logoutLoadAction, mailErrorAction, mailLoadAction, mailPreloadAction, registerErrorAction, registerLoadAction, registerPreloadAction, resetPasswordErrorAction, resetPasswordLoadAction, resetPasswordPreloadAction, userErrorAction, userLoadAction, userPreloadAction, userUpdateAction } from '../actions/user';
import { userReducer, initialState } from './user';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      {...initialState}
    )
  })

  it('check result action user preload', () => {
    expect(userReducer(undefined, userPreloadAction())).toEqual(
      {
        ...initialState,
        preload: true
      }
    )
  })

  it('check result action user error', () => {
    expect(userReducer(undefined, userErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        userError: true,
        errorMessage: 'Ошибка'
      }
    )
  })
  
  it('check result action mail preload', () => {
    expect(userReducer(undefined, mailPreloadAction())).toEqual(
      {
        ...initialState,
        preload: true
      }
    )
  })

  it('check result action mail error', () => {
    expect(userReducer(undefined, mailErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        mailError: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action reset password preload', () => {
    expect(userReducer(undefined, resetPasswordPreloadAction())).toEqual(
      {
        ...initialState,
        preload: true
      }
    )
  })

  it('check result action reset password error', () => {
    expect(userReducer(undefined, resetPasswordErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        resetError: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action login preload', () => {
    expect(userReducer(undefined, loginPreloadAction())).toEqual(
      {
        ...initialState,
        preload: true
      }
    )
  })

  it('check result action login error', () => {
    expect(userReducer(undefined, loginErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        loginError: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action register preload', () => {
    expect(userReducer(undefined, registerPreloadAction())).toEqual(
      {
        ...initialState,
        preload: true
      }
    )
  })

  it('check result action register error', () => {
    expect(userReducer(undefined, registerErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        registerError: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action refresh preload', () => {
    expect(userReducer(undefined, registerPreloadAction())).toEqual(
      {
        ...initialState,
        preload: true
      }
    )
  })

  it('check result action user update', () => {
    expect(userReducer({...initialState, user: {...UserObject}}, userUpdateAction({...UserObject, name: 'Max'}))).toEqual(
      {
        ...initialState,
        user: {...UserObject, name: 'Max'}
      }
    )
  })

  it('check result action user load', () => {
    expect(userReducer({...initialState}, userLoadAction(UserObject))).toEqual(
      {
        ...initialState,
        user: UserObject
      }
    )
  })

  it('check result action register load', () => {
    expect(userReducer({...initialState}, registerLoadAction(UserObject))).toEqual(
      {
        ...initialState,
        user: UserObject
      }
    )
  })

  it('check result action login load', () => {
    expect(userReducer({...initialState}, loginLoadAction(UserObject))).toEqual(
      {
        ...initialState,
        user: UserObject
      }
    )
  })

  it('check result action logout load', () => {
    expect(userReducer({...initialState, user: UserObject}, logoutLoadAction())).toEqual(
      {
        ...initialState,
        user: null
      }
    )
  })

  it('check result action mail load', () => {
    expect(userReducer({...initialState}, mailLoadAction())).toEqual(
      {
        ...initialState,
        mail: true
      }
    )
  })

  it('check result action reset password load', () => {
    expect(userReducer({...initialState}, resetPasswordLoadAction())).toEqual(
      {
        ...initialState,
        password: true
      }
    )
  })
})