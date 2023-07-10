import React, { FC } from 'react'
import styles from './register-page.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import RouteBottomText from '../components/route-bottom-text/route-bottom-text';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/actions/user';
import { getUserStore } from '../services/store';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const {user} = useAppSelector(getUserStore)
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(register({name, email, password}))
  }

  React.useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <span className="text text_type_main-medium">Регистрация</span>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setName(e.target.value)}
        value={name}
        name={'name'}
        error={false}
        errorText={'Неправильный имя'}
        size={'default'}
        extraClass="mt-6"
      />
      <EmailInput
        onChange={e => setEmail(e.target.value)}
        value={email}
        name={'email'}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={e => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass='mt-6 mb-10'>
        Зарегистрироваться
      </Button>
      <RouteBottomText className='mt-10' text='Уже зарегистрованы ?' link='/login' linkText='Войти'/>
    </form>
  )
}

export default RegisterPage;