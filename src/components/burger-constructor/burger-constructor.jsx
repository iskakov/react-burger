import styles from './burger-constructor.module.css'
import ListConstructor from '../list-constructor/list-constructor'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import PriceIcon from '../price-icon/price-icon';
import {BURGER_INGREDIENT_TYPE} from '../../utils/constants';
import React from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = (props) => {
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    setVisibleOrder(true);
  }
  const onCloseOrder = () => {
    setVisibleOrder(false);
  }
  const summ = props.burgerConstructor.reduce((accum, item) => accum + item.price, 0);
  return (
    <form className={styles.main + ' mr-5 ml-5 mt-25'} onSubmit={submit}>
      <section className={styles.list}>
        {props.burgerConstructor.map((item, index) => (
            <ListConstructor
              key={item['_id'] + '_' + index}
              __id={item['_id'] + '_' + index}
              delIngredient={props.delIngredient}
              index={index}
              length={props.burgerConstructor.length}
              {...item}
            />
          ))}
      </section>
      <section className={styles.submit + ' mt-10'}>
        <PriceIcon type='medium' price={summ}/>
        <Button extraClass='ml-10' htmlType="submit" type="primary" size="large">
          Оформить заказ
        </Button>
      </section>
      {visibleOrder && (
        <Modal onClose={onCloseOrder}>
          <OrderDetails/>
        </Modal>
      )}
    </form>
  )
}

BurgerConstructor.propTypes = {
  burgerConstructor: PropTypes.arrayOf(BURGER_INGREDIENT_TYPE.isRequired).isRequired
}

export default BurgerConstructor;
