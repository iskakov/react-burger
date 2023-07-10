import styles from './burger-ingredient.module.css';
import PriceIcon from '../price-icon/price-icon';
import React, { FC } from 'react';
import { useDispatch} from 'react-redux';
import { selectIngredientAction } from '../../services/actions/burger-ingredient';
import { useDrag } from "react-dnd";
import { IBurgerType } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
export interface IBurgerIngredientsType {
  ingredient: IBurgerType
}
const BurgerIngredient: FC<IBurgerIngredientsType> = ({ingredient}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [, dragRef] = useDrag<IBurgerIngredientsType>({
    type: "ingredients",
    item: { ingredient }
  });

  const showIngredientInfo = (): void => {
    dispatch(selectIngredientAction(ingredient))
    navigate('/ingredients/' + ingredient['_id'], { replace:true, state: {from: location} })
  }
  return (
      <div className={styles.main + ' mt-6 mb-2 mr-4 ml-2'}
      draggable
      ref={dragRef}
      onClick={showIngredientInfo}>
        {ingredient.count > 0 && (
          <section className={styles.counter}>
            <span className='text text_type_digits-default'>{ingredient.count}</span>
          </section>
        )}
        <section className={styles.content}>
          <img alt='Картинка ингредиента' className='mr-4 ml-4' src={ingredient.image}/>
          <PriceIcon type='default' price={ingredient.price}/>
          <span className={styles.name + ' text text_type_main-default'}>{ingredient.name}</span>
        </section>
      </div>
  );
}

export default BurgerIngredient;
