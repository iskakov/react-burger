import React from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ListIngredient from '../list-ingredient/list-ingredient'
import PropTypes from 'prop-types';
import { TYPE_OF_CATEGORY, BURGER_INGREDIENT_TYPE } from '../../utils/constants';

const BurgerIngredients = (props) => {
  const [currentTab, setCurrentTab] = React.useState(TYPE_OF_CATEGORY.bun)

  const onChangeTab = (currTab) => {
    document.getElementById(currTab).scrollIntoView();
    setCurrentTab(currTab);
  }

  const scrollTo = (currTab) => {
    setCurrentTab(currTab);
  }

  const categories = props.burgerIngredients.reduce((accum, burgerIngredient) => {
    if (!accum.hasOwnProperty(burgerIngredient.type)) {
      accum[burgerIngredient.type] = [];
    }
    accum[burgerIngredient.type].push(burgerIngredient);
    return accum;
  }, {});
  return (
    <section className={styles.main + ' mr-5 ml-5'}>
      <span className='mt-10 text text_type_main-medium'>Соберите бургер</span>
      <section className='mt-5'>
        <Tab value={TYPE_OF_CATEGORY.bun} active={currentTab === TYPE_OF_CATEGORY.bun} onClick={onChangeTab}>
          Булки
        </Tab>
        <Tab value={TYPE_OF_CATEGORY.sauce} active={currentTab === TYPE_OF_CATEGORY.sauce} onClick={onChangeTab}>
          Соусы
        </Tab>
        <Tab value={TYPE_OF_CATEGORY.main} active={currentTab === TYPE_OF_CATEGORY.main} onClick={onChangeTab}>
          Начинки
        </Tab>
      </section>
      <section className={styles.categories}>
        {Object.keys(categories).map(key => (
          <ListIngredient key={key} id={key} data={categories[key]} addIngredient={props.addIngredient} scrollTo={scrollTo}/>
        ))}
      </section>
    </section>
  )
}

BurgerIngredients.propTypes = {
  burgerIngredients: PropTypes.arrayOf(BURGER_INGREDIENT_TYPE.isRequired).isRequired
}

export default BurgerIngredients;