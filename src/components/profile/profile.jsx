import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserStore } from '../../services/store'
import { getUser, updateUser } from '../../services/reducers/user'
import styles from './profile.module.css';

export default function Profile() {
  const {user} = useSelector(getUserStore)
  const dispatch = useDispatch()
  const [name, setName] = React.useState('')
  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [readonly, setReadonly] = React.useState(true)
  const onIconClick = () => {
    setReadonly(!readonly)
  }
  const save = () => {
    dispatch(updateUser({name, email: login, password}))
    setReadonly(!readonly)
    setPassword('')

  }
  const cancel = () => {
    setName(user.name)
    setLogin(user.email)
    setPassword('')
    setReadonly(!readonly)
  }
  React.useEffect(()=> {
    const init = () => {
      dispatch(getUser())
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
