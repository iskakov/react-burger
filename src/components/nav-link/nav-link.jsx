import { Component } from 'react'
import styles from './nav-link.module.css'
import PropTypes from 'prop-types';
import { getNavIcon } from '../../utils/constants';

export default class NavLink extends Component {

  navigate= ()=> {

  }

  render() {
    const active = this.props.icon === this.props.active;
    const icon = getNavIcon(this.props.icon, this.props.active)
    return (
      <a href='/' onClick={this.navigate} className={styles['nav-link'] + ' mr-5 ml-5 mt-4 mb-4'}>
        {icon}
        <span className={(!active ? 'text_color_inactive' : '') + ' ml-2 text text_type_main-default'}>{this.props.text}</span>
      </a>
      
    )
  }
}

NavLink.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
}
