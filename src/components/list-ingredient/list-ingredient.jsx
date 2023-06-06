import styles from './list-ingredient.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { CATEGORY_ON_RUSSIAN, TYPE_OF_CATEGORY } from '../../utils/constants';
import PropTypes from 'prop-types';
import React from 'react';

const ListIngredient = (props) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;
        if(isIntersecting ) {
          props.scrollTo(target.id);
        };
      });
    }, {
      threshold: [0.6, 1]
    })
    observer.observe(document.getElementById(TYPE_OF_CATEGORY.bun));
    observer.observe(document.getElementById(TYPE_OF_CATEGORY.sauce));
    observer.observe(document.getElementById(TYPE_OF_CATEGORY.main));
    return () => observer.disconnect();
  }, [props]);

  return (
    <section id={props.id} className={styles.main}>
      <span className='pt-10 text text_type_main-medium'>{CATEGORY_ON_RUSSIAN[props.id]}</span>
      <section>
        {props.data.map((item) => 
          (<BurgerIngredient key={item['_id']} ingredient={item} />)
        )}
      </section>
    </section>
  );
}

ListIngredient.propTypes = {
  id: PropTypes.string.isRequired,
  scrollTo: PropTypes.func.isRequired
}

export default ListIngredient;
