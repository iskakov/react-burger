
import React, { FC } from 'react'
import styles from './ingredient-page.module.css';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

const IngredientPage: FC = () => {
  return (
    <section className={styles.main}>
      <span className='text text_type_main-large'>Детали ингредиента</span>
      <IngredientDetails/>
    </section>
  )
}

export default IngredientPage;