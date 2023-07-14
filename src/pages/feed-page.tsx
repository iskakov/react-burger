import React, { FC, useEffect } from 'react'
import styles from './feed-page.module.css'
import FeedDetail from '../components/feed-detail/feed-detail';
import { getIngredients } from '../services/actions/burger-ingredients';
import { feedsOnCloseAction, feedsOnInitAction } from '../services/actions/feeds';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getBurgerIngredients, getFeeds } from '../services/store';
import { useNavigate, useParams } from 'react-router-dom';
import { selectFeedAction } from '../services/actions/feed';

const FeedPage: FC = () => {
  const {ingredients} = useAppSelector(getBurgerIngredients)
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const {feeds} = useAppSelector(getFeeds)
  const {id} = useParams();

  useEffect(() => {
    if (feeds.length > 0 ) {
      dispatch(selectFeedAction(feeds.find(item => item['_id'] === id)));
    }
  }, [feeds])
  
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
      <FeedDetail/>
  </section>
  )
}

export default FeedPage;
