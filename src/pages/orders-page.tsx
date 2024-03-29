import React, { FC, useEffect } from 'react'
import styles from './orders-page.module.css'
import Feeds from '../components/feeds/feeds'
import { getBurgerIngredients, getOrders } from '../services/store'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { ordersOnCloseAction, ordersOnInitAction } from '../services/actions/orders'

type TOrderPage = {
  isModal?: boolean;
}

const OrdersPage: FC<TOrderPage> = ({isModal}) => {
  const {ingredients} = useAppSelector(getBurgerIngredients)
  const {orders} = useAppSelector(getOrders)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ordersOnInitAction());
    return () => {
      dispatch(ordersOnCloseAction());
    }
  },[]);
  return (
    <Feeds feeds={orders} isOrders={true} isModal={isModal}/>
  )
}

export default OrdersPage;
