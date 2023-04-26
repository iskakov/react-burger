import { Component } from 'react';
import styles from './list-ingredient.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { CATEGORY_ON_RUSSIAN, TYPE_OF_CATEGORY } from '../../utils/constants';
import PropTypes from 'prop-types';

class ListIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: TYPE_OF_CATEGORY.bun
    }
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;
        if( isIntersecting ) {
          if (this.state.currentTab === null) {
            this.state.currentTab = target.id;
            this.props.scrollTo(target.id);
          }
        } else {
          this.state.currentTab = null;
        }
      });
    }, {
      threshold: [0.5, 1]
    })
  }

  componentDidMount() {
    this.observer.observe(document.getElementById(TYPE_OF_CATEGORY.bun));
    this.observer.observe(document.getElementById(TYPE_OF_CATEGORY.sauce));
    this.observer.observe(document.getElementById(TYPE_OF_CATEGORY.main));
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }
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
