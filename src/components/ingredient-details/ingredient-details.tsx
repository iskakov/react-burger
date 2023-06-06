import React, { FC } from 'react';
import styles from './ingredient-details.module.css';
import InfoIngredient from '../info-ingredient/info-ingredient';
import { getBurgerIngredient } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredient } from '../../services/actions/burger-ingredient';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const IngredientDetails: FC = () => {
  const {ingredient} = useAppSelector(getBurgerIngredient)
  const {id} = useParams()
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const init = () => {
      dispatch(getIngredient(id))
    }
    init();
  }, [])

  return ingredient && (
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
export default IngredientDetails;
