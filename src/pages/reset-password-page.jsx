import React from 'react'
import styles from './reset-password-page.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../components/app-header/app-header';
import RouteBottomText from '../components/route-bottom-text/route-bottom-text';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../services/reducers/user';
import { getUserStore } from '../services/store';

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(getUserStore)
  const {state} = useLocation();
  const [code, setCode] = React.useState('')
  const [password, setPassword] = React.useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(changePassword({token: code, password}))
  }
  React.useEffect(() => {
    if (!state) {
      navigate('/login')
    }
  }, [state])

  React.useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  return (
    <>
      <form className={styles.main} onSubmit={onSubmit}>
        <span className="text text_type_main-medium">Восстановление пароля</span>
        <PasswordInput
          onChange={e => setPassword(e.target.value)}
          value={password}
          name={'password'}
          placeholder="Введите новый пароль"
          extraClass="mt-6"
        />
        <Input
          onChange={e => setCode(e.target.value)}
          value={code}
          name={'code'}
          placeholder="Введите код из письма"
          isIcon={true}
          extraClass="mt-6"
        />
        <Button htmlType="button" type="primary" size="large" extraClass='mt-6 mb-10'>
          Сохранить
        </Button>       
        <RouteBottomText className='mt-10' text='Вспомнили пароль ?' link='/login' linkText='Войти'/>
      </form>
    </>
  )
}