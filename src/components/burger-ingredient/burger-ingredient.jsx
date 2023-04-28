import styles from './burger-ingredient.module.css';
import PriceIcon from '../price-icon/price-icon';
import { BURGER_TYPE } from '../../utils/constants';
import { useLongPress } from 'use-long-press';
import React from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
const BurgerIngredient = (props) => {
  const [isModalIngredient, setIsModalIngredient] = React.useState(false);

  const bind = useLongPress(() => {
    setIsModalIngredient(true);
  });

  const onClose = () => {
    setIsModalIngredient(false);
  }
  return (
    <div className={styles.main + ' mt-6 mb-2 mr-4 ml-2'} {...bind()} onClick={e => props.addIngredient(props['_id'])}>
      {props['__v'] > 0 && (
        <section className={styles.counter}>
          <span className='text text_type_digits-default'>{props['__v']}</span>
        </section>
      )}
      <section className={styles.content}>
        <img alt='' className='mr-4 ml-4' src={props.image}/>
        <PriceIcon type='default' price={props.price}/>
        <span className={styles.name + ' text text_type_main-default'}>{props.name}</span>
      </section>
      {isModalIngredient && (
        <Modal header='Детали ингредиента' onClose={onClose}>
          <IngredientDetails {...props}/>
        </Modal>
      )}
    </div>
    
  );
}

BurgerIngredient.propTypes = BURGER_TYPE;

export default BurgerIngredient;
