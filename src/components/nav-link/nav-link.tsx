import styles from './nav-link.module.css'
import {Link, useLocation} from 'react-router-dom';

import { getNavIcon } from '../../utils/constants';
import React, { FC } from 'react';

interface INavLink {
  icon?: Readonly<string>,
  text: Readonly<string>,
  link: Readonly<string>,
}
const NavLink: FC<INavLink> = ({icon, text, link}) => {
  const {pathname} = useLocation();
  const active = link !== '/' ? pathname.includes(link.split('/')[1]) : pathname ===link;
  const iconObj = getNavIcon(icon, active);
  return (
    <section className={styles['nav-link'] + ' mr-5 ml-5 mt-4 mb-4'}>
      {iconObj}
      <Link to={link} className={styles.link + (!active ? ' text_color_inactive' : ' text_color_primary') + ' ml-2 text text_type_main-default'}>{text}</Link>
    </section>
  )
}
export default NavLink;
