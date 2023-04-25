import { Component } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ListIngredient from '../list-ingredient/list-ingredient'
import PropTypes from 'prop-types';

const burgerIngredient = PropTypes.shape({
  '_id': PropTypes.string,
  '__v': PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
})
export default class BurgerIngredients extends Component {
  state = {
    currentTab: 'bun'
  }
  onChangeTab = (currentTab) => {
    document.getElementById(currentTab).scrollIntoView();
    this.setState({
      currentTab
    });
  }
  render() {
    let categories = {};
    this.props.burgerIngredients.forEach(burgerIngredient => {
      if (!categories.hasOwnProperty(burgerIngredient.type)) {
        categories[burgerIngredient.type] = [];
      }
      categories[burgerIngredient.type].push(burgerIngredient);
    });
    return (
      <section className={styles.main + ' mr-5 ml-5'}>
        <span className='mt-10 text text_type_main-medium'>Соберите бургер</span>
        <section className='mt-5'>
          <Tab value="bun" active={this.state.currentTab === 'bun'} onClick={this.onChangeTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={this.state.currentTab === 'sauce'} onClick={this.onChangeTab}>
            Соусы
          </Tab>
          <Tab value="main" active={this.state.currentTab === 'main'} onClick={this.onChangeTab}>
            Начинки
          </Tab>
        </section>
        <section className={styles.categories}>
          {Object.keys(categories).map(key => (
            <ListIngredient key={key} id={key} data={categories[key]} addIngredient={this.props.addIngredient}/>
          ))}
        </section>
      </section>
    )
  }
}

BurgerIngredients.propTypes = {
  burgerIngredients: PropTypes.arrayOf(burgerIngredient).isRequired
}
