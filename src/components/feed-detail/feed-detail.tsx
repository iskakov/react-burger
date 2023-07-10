import React, { FC, useEffect, useState } from 'react'
import styles from './feed-detail.module.css'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { getBurgerIngredients, getFeed, getFeeds } from '../../services/store';
import { useParams } from 'react-router-dom';
import { selectFeedAction } from '../../services/actions/feed';
import FeeDDetailsIngredient from '../feed-details-ingredient/feed-details-ingredient';
import { IBurgerType, IFeedApi } from '../../utils/constants';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceIcon from '../price-icon/price-icon';


const FeedDetail: FC = () => {

  const {ingredients} = useAppSelector(getBurgerIngredients)
  const {feed} = useAppSelector(getFeed)
  const [status, setStatus] = useState<string>('');
  const [currIngrdients, setCurrIngredients] = useState<Array<IBurgerType>>([]);
  const [summ, setSumm] = useState<number>(0);


  useEffect(() => {
    if (ingredients.length > 0 && feed) {
      const cIngredients = feed.ingredients.map(id => ingredients.find(item => item['_id'] === id));
      
      setCurrIngredients(Object.values(cIngredients.reduce((accum, item) => {
        if(Object.keys(accum).includes(item['_id'])) {
          accum[item['_id']].count++;
        } else {
          accum[item['_id']] = {...item, count: item.type === 'bun' ? 2 : 1};
        } 
        return accum;
      }, {})))
      setSumm(cIngredients.reduce((accum, item) => {
        accum += item.price;
        if (item.type === 'bun') {
          accum += item.price;
        }
        return accum;
      }, 0))

    }

  }, [ingredients, feed])
  
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
  return feed &&(
    <section className={styles.main}>
      <span className={styles.number + ' text text_type_digits-default mb-10'}>#{feed.number}</span>
      <span className='text text_type_main-medium mb-3'>{feed.name}</span>
      <span className={ (feed.status === 'done' ? styles.statusDone : feed.status === 'canceled' ? styles.statusCanceled : '') + ' text text_type_main-default mb-10'}>{status}</span>
      <span className='text text_type_main-medium mt-5 mb-6'>Состав:</span>
      <section className={styles.ingredients + ' mb-10'}>
        {currIngrdients.map(ingredient => (
          <FeeDDetailsIngredient key={ingredient['_id']} ingredient={ingredient}/>
        ))}
      </section>
      <section className={styles.bottom}>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(feed.createdAt)}/> 
        <PriceIcon type='default' price={summ}/> 
      </section>
    </section>
  )
}

export default FeedDetail;
