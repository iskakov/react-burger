import styles from './burger-constructor.module.css'
import { Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PriceIcon from '../price-icon/price-icon';
import React, { FC } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { addIngredient } from '../../services/actions/burger-constructor';
import { pushOrder } from '../../services/actions/order';
import { useDrop } from "react-dnd";
import ConstructorItem from '../constructor-item/constructor-item';
import { v4 as uuidv4 } from 'uuid';
import { getBurgerConstructor, getOrder } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { IBurgerIngredientsType } from '../burger-ingredient/burger-ingredient';
import { IBurgerTypeConstructor } from '../../utils/constants';

const BurgerConstructor: FC = () => {
  const [visibleOrder, setVisibleOrder] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {ingredients, bun} = useAppSelector(getBurgerConstructor)
  const {orderPreload, orderError, errorMessage} = useAppSelector(getOrder)
  const [, dropTarget] = useDrop<IBurgerIngredientsType>({
    accept: "ingredients",
    drop(item) {
      dispatch(addIngredient(item.ingredient, uuidv4()))
    },
  });
  const navigate = useNavigate()
  const submit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (getCookie('accessToken')) {
      dispatch(pushOrder({ingredients: [ bun['_id'], ...ingredients.map(item => item['_id'])]}))
      setVisibleOrder(true);
    } else {
      navigate('/login')
    }
  }
  const totalPrice = React.useMemo<number>(()=> {
    return ingredients.reduce((accum, item) => accum += item.price, 0) + (bun ? bun.price : 0)
  }, [ingredients, bun])
  const itemConstructor = React.useCallback<React.FC>((item: IBurgerTypeConstructor) => {
    return (<ConstructorItem key={item.uuid} ingredient={item} />)
  },[]);
  const onCloseOrder = (): void => {
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
        {ingredients.map(item => (
            itemConstructor(item)
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
          <span className='text text_type_main-default'>{errorMessage}</span>
        </Modal>
      ))}
    </form>
  )
}

export default BurgerConstructor;
