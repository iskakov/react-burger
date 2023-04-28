import React from 'react';
import styles from './ingredient-details.module.css';
import InfoIngredient from '../info-ingredient/info-ingredient';
import { BURGER_TYPE } from '../../utils/constants';

const IngredientDetails = (props) => {
  return (
    <section className={styles.main}>
      <img className={styles.img} alt='' src={props.image_large}/>
      <span className='text text_type_main-medium mt-4'>{props.name}</span>
      <section className={styles.infoBlock + ' mt-8 m'}>
        <InfoIngredient name='Калории, ккал' number={props.calories}/>
        <InfoIngredient name='Белки, г' number={props.proteins}/>
        <InfoIngredient name='Жиры, г' number={props.fat}/>
        <InfoIngredient name='Углеводы, г' number={props.carbohydrates}/>
      </section>
    </section>
  );
}
IngredientDetails.propTypes = BURGER_TYPE;
export default IngredientDetails;
