import React, { FC, HTMLAttributes } from 'react'
import styles from './route-bottom-text.module.css';
import {Link} from 'react-router-dom';
interface IRouteBottomText extends HTMLAttributes<any> {
  text: Readonly<string>;
  link: Readonly<string>;
  linkText: Readonly<string>;
}
const RouteBottomText: FC<IRouteBottomText> = ({text, link, linkText}) => {
  return (
    <section>
      <span className='text text_type_main-default text_color_inactive'>{text}</span>
      <Link to={link} className={styles.bottomButton + ' text text_type_main-default text_color_secondary ml-2'}>{linkText}</Link>
    </section>
  )
}

export default RouteBottomText;