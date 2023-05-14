import styles from './burger-constructor.module.css'
import { Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PriceIcon from '../price-icon/price-icon';
import React from 'react';
import Modal from '../modal/modal';
import { useDispatch, useSelector} from 'react-redux';
import OrderDetails from '../order-details/order-details';
import { addIngredient } from '../../services/reducers/burger-constructor';
import { pushOrder } from '../../services/reducers/order';
import { useDrop } from "react-dnd";
import ConstructorItem from '../constructor-item/constructor-item';
import { v4 as uuidv4 } from 'uuid';
import { getBurgerConstructor, getOrder } from '../../services/store';

const BurgerConstructor = () => {
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  const dispatch = useDispatch();
  const {ingredients, bun} = useSelector(getBurgerConstructor)
  const {orderPreload, orderError, errorMessage} = useSelector(getOrder)
  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      if (item.fromIngredients) {
        dispatch(addIngredient(item.ingredient, uuidv4()))
      }
    },
  }); 
  const submit = (e) => {
    e.preventDefault();
    dispatch(pushOrder({ingredients: ingredients.map(item => item['_id'])}))
    setVisibleOrder(true);
  }
  const totalPrice = React.useMemo(()=> {
    return ingredients.reduce((accum, item) => accum += item.price, 0) + (bun ? bun.price : 0)
 }, [ingredients, bun])
  const itemConstructor = React.useCallback(item => {
    return (<ConstructorItem key={item.uuid} ingredient={item} />)
  },[]);
  const onCloseOrder = () => {
    setVisibleOrder(false);
  }
  return (
    <form className={styles.main + ' mr-5 ml-5 mt-25'} onSubmit={submit}>
      <section ref={dropTarget}className={styles.list}>
        {bun && (
          <ConstructorElement
            extraClass='ml-8 mb-4'
            type='top'
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image} />
        )}
        {ingredients.map((item, index) => (
            itemConstructor(item, index, false)
        ))}
        {bun && (
          <ConstructorElement
          extraClass='ml-8 mb-4'
            type='bottom'
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image} />
        )}
      </section>
      <section className={styles.submit + ' mt-10'}>
        <PriceIcon type='medium' price={totalPrice}/>
        <Button extraClass='ml-10' disabled={bun === null} htmlType="submit" type="primary" size="large">
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
