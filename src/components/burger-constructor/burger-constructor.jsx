import styles from './burger-constructor.module.css'
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PriceIcon from '../price-icon/price-icon';
import {TYPE_OF_CATEGORY} from '../../utils/constants';
import React from 'react';
import Modal from '../modal/modal';
import { useDispatch, useSelector} from 'react-redux';
import OrderDetails from '../order-details/order-details';
import { addIngredient } from '../../services/reducers/burger-constructor';
import { pushOrder } from '../../services/reducers/order';
import { useDrop } from "react-dnd";
import ConstructorItem from '../constructor-item/constructor-item';

const BurgerConstructor = () => {
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  const dispatch = useDispatch();
  const {ingredients, summ} = useSelector(store => store.burgerConstructor)
  const {orderPreload, orderError, errorMessage} = useSelector(store => store.order)
  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      if (item.fromIngredients) {
        dispatch(addIngredient(item.ingredient))
      }
    },
  }); 
  const submit = async (e) => {
    e.preventDefault();
    dispatch(pushOrder({ingredients: ingredients.map(item => item['_id'])}))
    setVisibleOrder(true);
  }
  const itemConstructor = React.useCallback((item, index, isLast, key) => {
    return isLast ? (
        <ConstructorItem key={key} index={index } ingredient={item} lastIndex={index+1}/>
      ) : (
        <ConstructorItem key={item['_id'] + '_' + index} index={index} ingredient={item} lastIndex={ingredients.length} />
      )
  },[]);
  const onCloseOrder = () => {
    setVisibleOrder(false);
  }
  return (
    <form className={styles.main + ' mr-5 ml-5 mt-25'} onSubmit={submit}>
      <section ref={dropTarget}className={styles.list}>
        {ingredients.map((item, index) => (
            itemConstructor(item, index, false,)
        ))}
        {ingredients.length > 0 && ingredients[0].type === TYPE_OF_CATEGORY.bun && (
            itemConstructor(ingredients[0], ingredients.length-1, true,  ingredients[0]['_id'] + '_' + ingredients.length-1, )
        )}
      </section>
      <section className={styles.submit + ' mt-10'}>
        <PriceIcon type='medium' price={summ}/>
        <Button extraClass='ml-10' htmlType="submit" type="primary" size="large">
          {orderPreload ? 'Отправляю заказ' : 'Оформить заказ'}
        </Button>
      </section>
      {visibleOrder && !orderPreload &&  (!orderError ? (
        <Modal onClose={onCloseOrder}>
          <OrderDetails/>
        </Modal>
      ) : (
        <Modal onClose={onCloseOrder}>
          <span class='text text_type_main-default'>{errorMessage}</span>
        </Modal>
      ))}
    </form>
  )
}

export default BurgerConstructor;
