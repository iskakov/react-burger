import styles from './burger-ingredient.module.css';
import PriceIcon from '../price-icon/price-icon';
import { useLongPress } from 'use-long-press';
import React from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch} from 'react-redux';
import { SELECT_INGREDIENT, CLEAR_IGREDIENT } from '../../services/actions/burger-ingredient';
import { useDrag } from "react-dnd";
import { BURGER_INGREDIENT_TYPE } from '../../utils/constants';

const BurgerIngredient = ({ingredient}) => {
  const [isModalIngredient, setIsModalIngredient] = React.useState(false);
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient, fromIngredients: true },
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });

  const onClose = () => {
    dispatch({type: CLEAR_IGREDIENT})
    setIsModalIngredient(false);
  }

  const addIngredientAction = () => {
    dispatch({type: SELECT_INGREDIENT, payload: ingredient})
    setIsModalIngredient(true);
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
        {isModalIngredient && (
          <Modal header='Детали ингредиента' onClose={onClose}>
            <IngredientDetails />
          </Modal>
        )}
      </div>
  );
}

BurgerIngredient.propTypes = {
  ingredient: BURGER_INGREDIENT_TYPE.isRequired
};

export default BurgerIngredient;
