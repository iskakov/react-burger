import headerStyles from './app-header.module.css'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import NavLink from '../nav-link/nav-link'

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.main}>
        <div className={headerStyles.item}>
          <NavLink icon='burger' text='Конструктор' link='/'/>
          <NavLink icon='list' text='Лента заказов' link='/orders'/>
        </div>
        <Logo extrClass={headerStyles.item} className='mt-6 mb-6'/>
        <NavLink className={headerStyles.item} text='Личный кабинет' link='/profile'/>
      </nav>
    </header>
  )
}

export default AppHeader;
