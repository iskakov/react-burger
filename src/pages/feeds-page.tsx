import React, { FC, useEffect } from 'react'
import styles from './feeds-page.module.css'
import Feeds from '../components/feeds/feeds';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getBurgerIngredients, getFeeds } from '../services/store';
import { getIngredients } from '../services/actions/burger-ingredients';
import { feedsOnCloseAction, feedsOnInitAction } from '../services/actions/feeds';
import FeedsInformation from '../components/feeds-information/feeds-information';
import { Outlet } from 'react-router-dom';

const FeedsPage: FC = () => {
  const {ingredients} = useAppSelector(getBurgerIngredients)
  const {feeds, total, totalToday} = useAppSelector(getFeeds)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(ingredients.length === 0) {
      dispatch(getIngredients())
    }
    dispatch(feedsOnInitAction());
    return () => {
      dispatch(feedsOnCloseAction());
    }
  },[]);

  return (
    <section className={styles.main}>
      <section className={styles.content}>
      <span className={styles.header + ' ml-5 mt-10 text text_type_main-large mb-6' }>Лента заказов</span>
        <section className={styles.leftContent + ' mr-10 ml-5'}>
          <Feeds feeds={feeds}/>
        </section>
        <section className={styles.mainContent + ' ml-5'}>
          <FeedsInformation feeds={feeds} total={total} totalToday={totalToday}/>
        </section>
      </section>
      <Outlet/>
  </section>
  )
}

export default FeedsPage;
