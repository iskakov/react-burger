import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { getUserStore } from '../../services/store'
import { getUser, updateUser } from '../../services/actions/user'
import styles from './profile.module.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

const Profile: FC = () => {
  const {user} = useAppSelector(getUserStore)
  const dispatch = useAppDispatch()
  const [name, setName] = React.useState<string>('')
  const [login, setLogin] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [readonly, setReadonly] = React.useState<boolean>(true)
  const onIconClick = (): void => {
    setReadonly(!readonly)
  }
  const save = (): void => {
    dispatch(updateUser({name, email: login, password}) as any)
    setReadonly(!readonly)
    setPassword('')

  }
  const cancel = (): void => {
    setName(user.name)
    setLogin(user.email)
    setPassword('')
    setReadonly(!readonly)
  }
  React.useEffect(()=> {
    const init = (): void => {
      dispatch(getUser() as any)
    }
    init()
  }, [])
  React.useEffect(()=> {
    if (user) {
      setName(user.name)
      setLogin(user.email)
    }
  }, [user])
  return (
    <section className={styles.main}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setName(e.target.value)}
        icon={'EditIcon'}
        value={name}
        name={'name'}
        readOnly= {readonly}
        onIconClick={onIconClick}
        size={'default'}
        extraClass="mb-6"
      />
      <Input
        type={'text'}
        placeholder={'Логин'}
        onChange={e => setLogin(e.target.value)}
        icon={'EditIcon'}
        value={login}
        name={'login'}
        readOnly= {readonly}
        onIconClick={onIconClick}
        size={'default'}
        extraClass="mb-6"
      />
      <Input
        type={'text'}
        placeholder={'Пароль'}
        onChange={e => setPassword(e.target.value)}
        icon={'EditIcon'}
        value={password}
        name={'password'}
        readOnly= {readonly}
        onIconClick={onIconClick}
        size={'default'}
        extraClass="mb-6"
      />
      {!readonly && (
        <section className={styles.buttons}> 
          <Button htmlType="button"  size="large" extraClass='mt-6 mb-10' onClick={cancel}>
            Отмена
          </Button>
          <Button htmlType="button" type="primary" size="large" extraClass='mt-6 mb-10' onClick={save}>
            Сохранить
          </Button>
        </section>
      )}
    </section>
  )
}

export default Profile;
