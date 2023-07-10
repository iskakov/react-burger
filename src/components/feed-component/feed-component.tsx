import React, { FC, useEffect, useState } from 'react'
import { IBurgerType, IFeedApi } from '../../utils/constants';
import styles from './feed-component.module.css'
import FeedIngredients from '../feed-ingredients/feed-ingredients';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceIcon from '../price-icon/price-icon';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getBurgerIngredients } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectFeedAction } from '../../services/actions/feed';

interface IFeedComponent {
  feed: IFeedApi,
  isOrders?: boolean
}

const FeedComponent: FC<IFeedComponent> =  ({feed, isOrders}) => {
  const [currIngrdients, setCurrIngredients] = useState<Array<IBurgerType>>([]);
  const [summ, setSumm] = useState<number>(0);
  const [status, setStatus] = useState<string>('');

  const {ingredients} = useAppSelector(getBurgerIngredients);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (ingredients.length > 0) {
      const localIngredients = feed.ingredients.map(id => ingredients.find(item => item['_id'] === id));
      setCurrIngredients(localIngredients);
      setSumm(localIngredients.reduce((accum, item) => {
        accum += item.price;
        if (item.type === 'bun') {
          accum += item.price;
        }
        return accum;
      }, 0))
    }
  }, [ingredients])
  
  useEffect(() => {
    if (feed) {
      switch (feed.status) {
        case 'done':
          setStatus('Выполнен')
          break;
        case 'creating':
          setStatus('Создан')
          break;
        case 'pending':
          setStatus('В работе')
        break;
        case 'canceled':
          setStatus('Отменен')
        break;
      }
    }
  }, [feed])
  const showFeedInfo = (): void => {
    dispatch(selectFeedAction(feed))
    navigate((isOrders ? '/profile/orders/' :'/feed/') + feed['_id'], { replace:true, state: {from: location} })
  }
  return (
    <section className={styles.main + ' mb-4 p-6 mr-2'} onClick={showFeedInfo}>
      <section className={styles.header + ' mt-6 mb-6'}>
        <span className='text text_type_digits-default'>#{feed.number}</span>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(feed.createdAt)}/>
      </section>
      <span className={ styles.name + (isOrders ? ' mb-2' : ' mb-6') + ' text text_type_main-medium'}>{feed.name}</span>
      {isOrders && (
        <span className={(feed.status === 'done' ? styles.statusDone : feed.status === 'canceled' ? styles.statusCanceled : '') + ' text text_type_main-default mb-6'}>{status}</span>
      )}
      <section className={styles.ingredients}>
        <FeedIngredients ingredients={currIngrdients}/>
        <PriceIcon type='default' price={summ}/>
      </section>
    </section>
  )
}
export default FeedComponent;
