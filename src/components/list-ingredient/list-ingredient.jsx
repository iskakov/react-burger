import { Component } from 'react';
import styles from './list-ingredient.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { CATEGORY_ON_RUSSIAN } from '../../utils/constants';
import PropTypes from 'prop-types';

class ListIngredient extends Component {
  render() {
    return (
      <section id={this.props.id} className={styles.main}>
        <span className='pt-10 text text_type_main-medium'>{CATEGORY_ON_RUSSIAN[this.props.id]}</span>
        <section>
          {this.props.data.map((item) => 
            (<BurgerIngredient key={item['_id']} {...item} addIngredient={this.props.addIngredient}/>)
          )}
        </section>
      </section>
    );
  }
}
ListIngredient.propTypes = {
  id: PropTypes.string.isRequired,
  addIngredient: PropTypes.func.isRequired
}
export default ListIngredient;
