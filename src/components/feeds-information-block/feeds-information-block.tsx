import React, { FC, HTMLAttributes } from 'react'
import styles from './feeds-information-block.module.css'
type TFeedsInformationBlock = {
  title: string;
  feedsNumber: Array<number>;
  isReady?: boolean
} & HTMLAttributes<HTMLDivElement>

const FeedsInformationBlock: FC<TFeedsInformationBlock> = ({title, feedsNumber, isReady}) => {

  return (
    <section className={styles.main}>
      <span className='text text_type_main-default mb-6'>{title}</span>
      <section className={styles.feedsNumber}>
        {feedsNumber.slice(0, 30).map((number, index) => (
          <span key={'randomId' + index} className={(isReady ? styles.isReady : '' )+ ' text text_type_digits-default mb-2 mr-2'}>{number}</span>
        ))}
      </section>
    </section>
  )
}

export default FeedsInformationBlock
