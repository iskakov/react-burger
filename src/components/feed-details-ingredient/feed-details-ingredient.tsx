import React, { FC, useState } from 'react'
import styles from './feed-details-ingredient.module.css'
import { IBurgerType } from '../../utils/constants'
import PriceIcon from '../price-icon/price-icon'

type TFeedDetailsIngredient = {
  ingredient: IBurgerType
}

const FeeDDetailsIngredient: FC<TFeedDetailsIngredient> = ({ingredient}) => {
  return (
    <section className={styles.main + ' mb-4 mr-6'}>
      <section className={styles.ingredient + ' mr-4'}>
        <img className={styles.img} alt='ingredient' src={ingredient.image_mobile}/>
      </section>
      <section className={styles.name + ' mr-4'}>
        <span className='text text_type_main-default'>{ingredient.name}</span> 
      </section>
      <section className={styles.totalPrice}>
        <span className='text text_type_digits-default mr-2'>{ingredient.count} x</span>
        <PriceIcon type='default' price={ingredient.price}/>
      </section>
    </section>
  )
}
export default FeeDDetailsIngredient;

