import styles from './burger-ingredient.module.css';
import PriceIcon from '../price-icon/price-icon';
import React from 'react';
import { useDispatch} from 'react-redux';
import { SELECT_INGREDIENT } from '../../services/actions/burger-ingredient';
import { useDrag } from "react-dnd";
import { BURGER_INGREDIENT_TYPE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const BurgerIngredient = ({ingredient}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient, fromIngredients: true },
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });


  const addIngredientAction = () => {
    dispatch({type: SELECT_INGREDIENT, payload: ingredient})
    const initialState = [{ path: '/ingredients/' + ingredient['_id'], url: '/ingredients/' + ingredient['_id'], title: 'show ingredient' }];
    navigate('/ingredients/' + ingredient['_id'], { replace:true, state:initialState })
  }
  return (
      <div className={styles.main + ' mt-6 mb-2 mr-4 ml-2'}
      draggable
      ref={dragRef}
      onClick={addIngredientAction}>
        {ingredient.count > 0 && (
          <section className={styles.counter}>
            <span className='text text_type_digits-default'>{ingredient.count}</span>
          </section>
        )}
        <section className={styles.content}>
          <img alt='' className='mr-4 ml-4' src={ingredient.image}/>
          <PriceIcon type='default' price={ingredient.price}/>
          <span className={styles.name + ' text text_type_main-default'}>{ingredient.name}</span>
        </section>
      </div>
  );
}

BurgerIngredient.propTypes = {
  ingredient: BURGER_INGREDIENT_TYPE.isRequired
};

export default BurgerIngredient;
