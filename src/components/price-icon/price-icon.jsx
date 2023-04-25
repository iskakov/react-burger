import { Component } from 'react';
import styles from './price-icon.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class PriceIcon extends Component {
  render() {
    return (
      <section className={styles.price + ' mt-1 mb-1'}>
        <span className={(this.props.type === 'default'? 'text_type_digits-default' : 'text_type_digits-medium') + ' text mr-2'}>{this.props.price}</span>
        <CurrencyIcon type="primary" />
      </section>
    );
  }
}

export default PriceIcon;
