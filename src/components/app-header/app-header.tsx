import headerStyles from './app-header.module.css'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import NavLink from '../nav-link/nav-link'
import { FC } from 'react'
import React from 'react'

const AppHeader: FC = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.main}>
        <div className={headerStyles.item}>
          <NavLink icon='burger' text='Конструктор' link='/'/>
          <NavLink icon='list' text='Лента заказов' link='/orders'/>
        </div>
        <Logo />
        <NavLink text='Личный кабинет' link='/profile'/>
      </nav>
    </header>
  )
}

export default AppHeader;
