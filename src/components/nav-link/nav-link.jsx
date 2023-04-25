import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Component } from 'react'
import styles from './nav-link.module.css'
export default class NavLink extends Component {

  navigate= ()=> {
    console.log('navigate');
  }

  render() {
    let icon, active = this.props.icon === this.props.active;

    switch (this.props.icon) {
      case 'burger':
        icon = (<BurgerIcon type={active ? 'primary' : 'secondary'} />)
        break;

      case 'list':
        icon = (<ListIcon type={active ? 'primary' : 'secondary'} />)
        break;
    
      default:
        icon = (<ProfileIcon type={active ? 'primary' : 'secondary'} />)
        break;
    }
    
    return (
      <a href='/' onClick={this.navigate} className={styles['nav-link'] + ' mr-5 ml-5 mt-4 mb-4'}>
        {icon}
        <span className={(!active ? 'text_color_inactive' : '') + ' ml-2 text text_type_main-default'}>{this.props.text}</span>
      </a>
      
    )
  }
}
