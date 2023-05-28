import React from 'react'
import styles from './route-bottom-text.module.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RouteBottomText({text, link, linkText}) {
  return (
    <section>
      <span className='text text_type_main-default text_color_inactive'>{text}</span>
      <Link to={link} className={styles.bottomButton + ' text text_type_main-default text_color_secondary ml-2'}>{linkText}</Link>
    </section>
  )
}

RouteBottomText.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
}
