import { Component } from 'react';
import styles from './list-ingredient.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
const TYPE_CATEGORY = {
  'bun': 'Булки',
  'main': 'Начинки',
  'sauce': 'Соусы'
}
class ListIngredient extends Component {
  render() {
    return (
      <section id={this.props.id} className={styles.main}>
        <span className='pt-10 text text_type_main-medium'>{TYPE_CATEGORY[this.props.id]}</span>
        <section>
          {this.props.data.map((item) => 
            (<BurgerIngredient key={item['_id']} {...item} addIngredient={this.props.addIngredient}/>)
          )}
        </section>
      </section>
    );
  }
}

export default ListIngredient;
