import React, { FC } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ListIngredient from '../list-ingredient/list-ingredient'
import { TCategroies, TYPE_OF_CATEGORY } from '../../utils/constants';
import { getBurgerIngredients } from '../../services/store';
import { useAppSelector } from '../../utils/hooks';

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = React.useState<TYPE_OF_CATEGORY>(TYPE_OF_CATEGORY.bun)
  const {ingredients, ingredientsPreload, ingredientsError, errorMessage} = useAppSelector(getBurgerIngredients)

  const onChangeTab = (currTab: TYPE_OF_CATEGORY): void => {
    document.getElementById(currTab)?.scrollIntoView();
    setCurrentTab(currTab);
  }

  const scrollTo = (currTab: TYPE_OF_CATEGORY): void => {
    setCurrentTab(currTab);
  }

  const categories: TCategroies = ingredients.reduce((accum, burgerIngredient) => {
    if (!accum.hasOwnProperty(burgerIngredient.type)) {
      accum[burgerIngredient.type] = [];
    }
    accum[burgerIngredient.type].push(burgerIngredient);
    return accum;
  }, {});
  return (
    <section className='mr-5 ml-5' data-cy='ingredients'>
      {ingredientsPreload ? (
        <div className={`${styles.main} ${styles.loading} text text_type_main-large`}> Идет загрузкка данных...</div>
      ) : ingredientsError ? (
        <div className={`${styles.main} ${styles.error} text text_type_main-large`} > {errorMessage}</div>
      ) : (
        <section className={styles.main}> 
          <span className='mt-10 text text_type_main-medium'>Соберите бургер</span>
          <section className='mt-5'>
            <Tab value={TYPE_OF_CATEGORY.bun} active={currentTab === TYPE_OF_CATEGORY.bun} onClick={onChangeTab}>
              Булки
            </Tab>
            <Tab value={TYPE_OF_CATEGORY.main} active={currentTab === TYPE_OF_CATEGORY.main} onClick={onChangeTab}>
              Начинки
            </Tab>
            <Tab value={TYPE_OF_CATEGORY.sauce} active={currentTab === TYPE_OF_CATEGORY.sauce} onClick={onChangeTab}>
              Соусы
            </Tab>
          </section>
            <section className={styles.categories}>
              {Object.keys(categories).map(key => (
                <ListIngredient key={key} id={key} data={categories[key]} scrollTo={scrollTo}/>
              ))}
            </section>
        </section>
      )}
    </section>
  )
}


export default BurgerIngredients;