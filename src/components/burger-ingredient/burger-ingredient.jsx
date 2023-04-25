import React, { Component } from 'react';
import styles from './burger-ingredient.module.css';
import PriceIcon from '../price-icon/price-icon';

class BurgerIngredient extends Component {
  render() {
    return (
      <div className={styles.main + ' mt-6 mb-2 mr-4 ml-2'} onClick={e => this.props.addIngredient(this.props['_id'])}>
        {this.props['__v'] > 0 && (
          <section className={styles.counter}>
            <span className='text text_type_digits-default'>{this.props['__v']}</span>
          </section>
        )}
        <section className={styles.content}>
          <img alt='' className='mr-4 ml-4' src={this.props.image}/>
          <PriceIcon type='default' price={this.props.price}/>
          <span className={styles.name + ' text text_type_main-default'}>{this.props.name}</span>
        </section>
      </div>
    );
  }
}
export default BurgerIngredient;
