import styles from './price-icon.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
interface IPriceIcon {
  type: Readonly<string>,
  price: Readonly<number>,
}
const PriceIcon: FC<IPriceIcon> = ({type, price}) => {
  return (
    <section className={styles.price + ' mt-1 mb-1'}>
      <span className={(type === 'default'? 'text_type_digits-default' : 'text_type_digits-medium') + ' text mr-2'}>{price}</span>
      <CurrencyIcon type="primary" />
    </section>
  );
}

export default PriceIcon;
