import React from 'react';
import styles from './info-ingredient.module.css';
import PropTypes from 'prop-types';

const InfoIngredient = (props) => {
  return (
    <section className={styles.main}>
      <span className='text text_type_main-default text_color_inactive'>{props.name}</span>
      <span className='text text_type_main-default text_color_inactive mt-2'>{props.number}</span>
    </section>
  );
}
InfoIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
}
export default InfoIngredient;
