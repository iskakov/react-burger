import React from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ListIngredient from '../list-ingredient/list-ingredient'
import { TYPE_OF_CATEGORY } from '../../utils/constants';
import { useDispatch, useSelector} from 'react-redux';
import { getIngredientsAction } from '../../services/reducers/burger-ingredients';
import { getBurgerIngredients } from '../../services/store';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = React.useState(TYPE_OF_CATEGORY.bun)
  const dispatch = useDispatch();
  const {ingredients, ingredientsPreload, ingredientsError, errorMessage} = useSelector(getBurgerIngredients)
  React.useEffect(() => {
    dispatch(getIngredientsAction())
  }, [dispatch]);

  const onChangeTab = (currTab) => {
    document.getElementById(currTab).scrollIntoView();
    setCurrentTab(currTab);
  }

  const scrollTo = (currTab) => {
    setCurrentTab(currTab);
  }

  const categories = ingredients.reduce((accum, burgerIngredient) => {
    if (!accum.hasOwnProperty(burgerIngredient.type)) {
      accum[burgerIngredient.type] = [];
    }
    accum[burgerIngredient.type].push(burgerIngredient);
    return accum;
  }, {});
  return (
    <section className='mr-5 ml-5'>
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
            <Tab value={TYPE_OF_CATEGORY.sauce} active={currentTab === TYPE_OF_CATEGORY.sauce} onClick={onChangeTab}>
              Соусы
            </Tab>
            <Tab value={TYPE_OF_CATEGORY.main} active={currentTab === TYPE_OF_CATEGORY.main} onClick={onChangeTab}>
              Начинки
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