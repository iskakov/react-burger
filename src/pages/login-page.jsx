import React from 'react'
import styles from './login-page.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import RouteBottomText from '../components/route-bottom-text/route-bottom-text';
import { login } from '../services/reducers/user';
import { useDispatch } from 'react-redux';

export default function LoginPage() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login({email, password}))
  }
  return (
    <>
      <form className={styles.main} onSubmit={onSubmit}>
      <span className="text text_type_main-medium">Вход</span>
      <EmailInput
        onChange={e => setEmail(e.target.value)}
        value={email}
        name={'email'}
        placeholder="E-mail"
        contentEditable={true}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={e => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass='mt-6 mb-10'>
        Вход
      </Button>
      <RouteBottomText className='mt-10' text='Вы новый пользователь ?' link='/register' linkText='Зарегистрироваться'/>
      <RouteBottomText className='mt-1' text='Забыли пароль ?' link='/forgot-password' linkText='Восстановить пароль'/>
    </form>
    </>
  )
}
