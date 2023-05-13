import React from 'react';
import styles from './ingredient-details.module.css';
import InfoIngredient from '../info-ingredient/info-ingredient';
import { BURGER_TYPE } from '../../utils/constants';
import { useSelector} from 'react-redux';

const IngredientDetails = () => {
  const {ingredient} = useSelector(store => store.burgerIngredient)

  return (
    <section className={styles.main}>
      <img className={styles.img} alt='' src={ingredient.image_large}/>
      <span className='text text_type_main-medium mt-4'>{ingredient.name}</span>
      <section className={styles.infoBlock + ' mt-8 m'}>
        <InfoIngredient name='Калории, ккал' number={ingredient.calories}/>
        <InfoIngredient name='Белки, г' number={ingredient.proteins}/>
        <InfoIngredient name='Жиры, г' number={ingredient.fat}/>
        <InfoIngredient name='Углеводы, г' number={ingredient.carbohydrates}/>
      </section>
    </section>
  );
}
IngredientDetails.propTypes = BURGER_TYPE;
export default IngredientDetails;
