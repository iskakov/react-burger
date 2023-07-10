import React, { FC } from 'react'
import styles from './feeds.module.css'
import FeedComponent from '../feed-component/feed-component';
import { IFeedApi } from '../../utils/constants';

type TFeeds = {
  feeds: Array<IFeedApi>;
  isOrders?: boolean 
}

const Feeds: FC<TFeeds> = ({feeds, isOrders}) => {

  return feeds && (
    <section className={isOrders ? styles.mainOrders : styles.mainFeeds}>
      {feeds.map(feed => (
        <FeedComponent key={feed['_id']} feed={feed} isOrders={isOrders}/>
      ))}
    </section>
  )
}

export default Feeds;
