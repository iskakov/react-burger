import React, { FC } from 'react';
import styles from './info-ingredient.module.css';
interface IInfoIngredient {
  name: Readonly<string>;
  number: Readonly<number>;
}
const InfoIngredient: FC<IInfoIngredient> = ({name, number}) => {
  return (
    <section className={styles.main}>
      <span className='text text_type_main-default text_color_inactive'>{name}</span>
      <span className='text text_type_main-default text_color_inactive mt-2'>{number}</span>
    </section>
  );
}
export default InfoIngredient;
