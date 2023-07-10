import React, { FC } from 'react'
import styles from './reset-password-page.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import RouteBottomText from '../components/route-bottom-text/route-bottom-text';
import { useLocation, useNavigate } from 'react-router-dom';
import { changePassword } from '../services/actions/user';
import { getUserStore } from '../services/store';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const ResetPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {user} = useAppSelector(getUserStore)
  const {state} = useLocation();
  const [code, setCode] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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
        extraClass="mt-6"
      />
      <Button htmlType="button" type="primary" size="large" extraClass='mt-6 mb-10'>
        Сохранить
      </Button>       
      <RouteBottomText className='mt-10' text='Вспомнили пароль ?' link='/login' linkText='Войти'/>
    </form>
  )
}

export default ResetPasswordPage;