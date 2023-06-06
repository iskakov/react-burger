import styles from './nav-link.module.css'
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';

import { getNavIcon } from '../../utils/constants';

const NavLink = (props) => {
  const {pathname} = useLocation();
  const active = props.link !== '/' ? pathname.includes(props.link.split('/')[1]) : pathname ===props.link;
  const icon = getNavIcon(props.icon, active);
  return (
    <section className={styles['nav-link'] + ' mr-5 ml-5 mt-4 mb-4'}>
      {icon}
      <Link to={props.link} className={styles.link + (!active ? ' text_color_inactive' : ' text_color_primary') + ' ml-2 text text_type_main-default'}>{props.text}</Link>
    </section>
  )
}

NavLink.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}
export default NavLink;
