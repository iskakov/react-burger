import React from 'react';
import styles from './ingredient-details.module.css';
import InfoIngredient from '../info-ingredient/info-ingredient';
import { useDispatch, useSelector} from 'react-redux';
import { getBurgerIngredient } from '../../services/store';
import { useLocation, useParams } from 'react-router-dom';
import { getIngredient } from '../../services/actions/burger-ingredient';

const IngredientDetails = () => {
  const {ingredient} = useSelector(getBurgerIngredient)
  const {id} = useParams()
  const dispatch = useDispatch();
  const {state} = useLocation()

  React.useEffect(() => {
    const init = () => {
      dispatch(getIngredient(id))
    }
    init();
  }, [])

  React.useEffect(() => {
    if (!state) {
      
    }
  }, [state])

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
