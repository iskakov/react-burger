import React, { FC, useEffect, useState } from 'react'
import styles from './feeds-information.module.css'
import FeedsInformationBlock from '../feeds-information-block/feeds-information-block'
import { IFeedApi } from '../../utils/constants'

type TFeedsInformation = {
  feeds: Array<IFeedApi>;
  totalToday: number;
  total: number;
}

const FeedsInformation: FC<TFeedsInformation> = ({feeds, totalToday, total}) => {

  const [readyFeedsNumber, setReadyFeedsNumber] = useState<Array<number>>([])
  const [inWorkFeedsNumber, setInWorkFeedsNumber] = useState<Array<number>>([])

  useEffect(() => {
    if (feeds.length > 0) {
      setReadyFeedsNumber(feeds.filter(item => item.status === 'done').map(item => item.number))
      setInWorkFeedsNumber(feeds.filter(item => item.status === 'pending').map(item => item.number))
    }
  }, [feeds])


  return (
    <section className={styles.main}>
      <section className={styles.feedsNumber + ' mb-10'}>
        <FeedsInformationBlock className='mr-9' title='Готовы:' isReady={true} feedsNumber={readyFeedsNumber}/>
        <FeedsInformationBlock title='В работе:' feedsNumber={inWorkFeedsNumber}/>
      </section>
      <section className={styles.total + ' mt-5 mb-10'}>
        <span className='text text_type_main-default'> Выполнено за все время:</span>
        <span className='text text_type_digits-large'>{total}</span>
      </section>
      <section className={styles.total + ' mt-5 '}>
        <span className='text text_type_main-default'> Выполнено за сегодня:</span>
        <span className='text text_type_digits-large'>{totalToday}</span>
      </section>
    </section>
  )
}
export default FeedsInformation
