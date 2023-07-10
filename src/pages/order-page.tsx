import React, { FC, useEffect } from 'react'
import styles from './feed-page.module.css'
import FeedDetail from '../components/feed-detail/feed-detail';
import { getIngredients } from '../services/actions/burger-ingredients';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getBurgerIngredients, getOrders } from '../services/store';
import { ordersOnCloseAction, ordersOnInitAction } from '../services/actions/orders';
import { useParams } from 'react-router-dom';
import { selectFeedAction } from '../services/actions/feed';

const OrderPage: FC = () => {
  const {ingredients} = useAppSelector(getBurgerIngredients)
  const dispatch = useAppDispatch();

  const {orders} = useAppSelector(getOrders)
  const {id} = useParams();

  useEffect(() => {
    if (orders.length > 0 ) {
      dispatch(selectFeedAction(orders.find(item => item['_id'] === id)));
    }
  }, [orders])
  useEffect(() => {
    if(ingredients.length === 0) {
      dispatch(getIngredients())
    }
    dispatch(ordersOnInitAction());
    return () => {
      dispatch(ordersOnCloseAction());
    }
  },[]);
  return (
    <section className={styles.main}>
      <FeedDetail/>
  </section>
  )
}

export default OrderPage;
