import React, { FC, useEffect } from 'react'
import styles from './orders-page.module.css'
import Feeds from '../components/feeds/feeds'
import { getBurgerIngredients, getOrders } from '../services/store'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { getIngredients } from '../services/actions/burger-ingredients'
import { ordersOnCloseAction, ordersOnInitAction } from '../services/actions/orders'

const OrdersPage: FC = () => {
  const {ingredients} = useAppSelector(getBurgerIngredients)
  const {orders} = useAppSelector(getOrders)
  const dispatch = useAppDispatch();

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
    <Feeds feeds={orders} isOrders={true}/>
  )
}

export default OrdersPage;
