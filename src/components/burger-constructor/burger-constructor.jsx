import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import PriceIcon from '../price-icon/price-icon';
import {TYPE_OF_CATEGORY} from '../../utils/constants';
import React from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {BurgerConstructorContext} from '../../services/burger-constructor'
import { newOrder } from '../../utils/api';
import { OrderContext } from '../../services/order-context';


const BurgerConstructor = ({delIngredient}) => {
  const { burgerConstructor, summ } = React.useContext(BurgerConstructorContext); 
  const { order, setOrder } = React.useContext(OrderContext); 
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    let data;
    try {
      data = await newOrder({ingredients: burgerConstructor.map(item => item['_id'])});
    } catch (e) {
      data = e
    }
    setOrder(data);
    setVisibleOrder(true);
  }
  const onCloseOrder = () => {
    setVisibleOrder(false);
  }
  return (
    <form className={styles.main + ' mr-5 ml-5 mt-25'} onSubmit={submit}>
      <section className={styles.list}>
        {burgerConstructor.map((item, index) => (
            <section key={item['_id'] + '_' + index} className={styles['constructor-element'] + (item.type === TYPE_OF_CATEGORY.bun ? ' ml-8': '') + ' mb-4'}>
              {item.type !== TYPE_OF_CATEGORY.bun && (
                <div className='mr-2'>
                  <DragIcon type="primary" />
                </div>
              )}
              <ConstructorElement
              type={index === 0 ? 'top' : ''}
              isLocked={item.type === TYPE_OF_CATEGORY.bun}
              text={item.name + (item.type === TYPE_OF_CATEGORY.bun ? ' (верх)' : '')}
              price={item.price}
              thumbnail={item.image}
              handleClose={e => delIngredient(item['_id'] + '_' + index)} />
            </section>
        ))}
        {burgerConstructor.length > 0 && burgerConstructor[0].type === TYPE_OF_CATEGORY.bun && (
          <ConstructorElement
            key={burgerConstructor[0]['_id'] + '_' + burgerConstructor.length-1}
            extraClass={styles['constructor-element'] + ' ml-8 mb-4'}
            type='bottom'
            isLocked={true}
            text={burgerConstructor[0].name + ' (низ)'}
            price={burgerConstructor[0].price}
            thumbnail={burgerConstructor[0].image}
          />
        )}
      </section>
      <section className={styles.submit + ' mt-10'}>
        <PriceIcon type='medium' price={summ.summ}/>
        <Button extraClass='ml-10' htmlType="submit" type="primary" size="large">
          Оформить заказ
        </Button>
      </section>
      {visibleOrder && (order.success ? (
        <Modal onClose={onCloseOrder}>
          <OrderDetails/>
        </Modal>
      ) : (
        <Modal onClose={onCloseOrder}>
          <span class='text text_type_main-default'>{order.message}</span>
        </Modal>
      ))}
    </form>
  )
}

BurgerConstructor.propTypes = {
  delIngredient: PropTypes.func.isRequired
}

export default BurgerConstructor;
