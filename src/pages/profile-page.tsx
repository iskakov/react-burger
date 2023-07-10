import React, { FC } from 'react'
import styles from './profile-page.module.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

const ProfilePage: FC = () => {
  const {pathname} = useLocation();

  return (
    <section className={styles.main}>
      <section className={styles.content}>
        <section className={styles.links + ' mr-10'}>
          <section className={styles.topContent}>
            <Link to='/profile' className={styles.link + (pathname === '/profile'  ? ' text_color_primary' : ' text_color_inactive') + ' text text_type_main-medium'}>Профиль</Link>
            <Link to='/profile/orders' className={styles.link + (pathname !== '/profile/orders'  ? ' text_color_inactive' : ' text_color_primary') + ' text text_type_main-medium '}>История заказов</Link>
            <Link to='/logout' className={styles.link + ' text text_type_main-medium text_color_inactive'}>Выход</Link>
          </section>
          <section className={styles.description}>
            <p className='text text_type_main-small text_color_inactive'>В этом разделе вы сможете изменить свои персональные данные</p>
          </section>
        </section>
        <section className={styles.mainContent + ' ml-5'}>
          <Outlet/>
        </section>
      </section>
    </section>
  )
}

export default ProfilePage;