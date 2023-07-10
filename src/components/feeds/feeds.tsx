import React, { FC } from 'react'
import styles from './feeds.module.css'
import FeedComponent from '../feed-component/feed-component';
import { IFeedApi } from '../../utils/constants';
import ModalOrder from '../modal-order/modal-order';

type TFeeds = {
  feeds: Array<IFeedApi>;
  isOrders?: boolean;
  isModal?: boolean;
}

const Feeds: FC<TFeeds> = ({feeds, isOrders, isModal}) => {

  return feeds && (
    <section className={isOrders ? styles.mainOrders : styles.mainFeeds}>
      {[...(isOrders ? [...feeds].reverse() : feeds)].map(feed => (
        <FeedComponent key={feed['_id']} feed={feed} isOrders={isOrders}/>
      ))}
      {isModal && (<ModalOrder/>)}
    </section>
  )
}

export default Feeds;
