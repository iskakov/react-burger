import styles from './nav-link.module.css'
import PropTypes from 'prop-types';
import { getNavIcon } from '../../utils/constants';

const NavLink = (props) => {
  const active = props.icon === props.active;
  const icon = getNavIcon(props.icon, props.active)
  return (
    <a href='/' className={styles['nav-link'] + ' mr-5 ml-5 mt-4 mb-4'}>
      {icon}
      <span className={(!active ? 'text_color_inactive' : '') + ' ml-2 text text_type_main-default'}>{props.text}</span>
    </a>
  )
}

NavLink.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired
}
export default NavLink;
