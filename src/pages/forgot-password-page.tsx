import React, { FC } from 'react'
import styles from './login-page.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import RouteBottomText from '../components/route-bottom-text/route-bottom-text';
import { useNavigate } from 'react-router-dom';
import { getUserStore } from '../services/store';
import { checkEmail } from '../services/actions/user';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const {mail} = useAppSelector(getUserStore)
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<string>('')
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(checkEmail({email}))
  }
  React.useEffect(() => {
    if (mail) {
      const initialState = [{ path: '/forgot-password', url: '/forgot-password', title: 'Forgot password' }];
      navigate('/reset-password', { replace:true, state:initialState })
    }
  }, [mail, navigate])
  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <span className="text text_type_main-medium">Восстановление пароля</span>
      <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={e => setEmail(e.target.value)}
        value={email}
        name={'email'}
        error={false}
        errorText={'Неправильный e-mail'}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass='mt-6 mb-10' >
        Восстановить
      </Button>
      <RouteBottomText className='mt-10' text='Вспомнили пароль ?' link='/login' linkText='Войти'/>
    </form>
  )
}

export default ForgotPasswordPage;