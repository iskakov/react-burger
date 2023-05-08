import { Component } from 'react'
import styles from './burger-constructor.module.css'
import ListConstructor from '../list-constructor/list-constructor'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import PriceIcon from '../price-icon/price-icon';
import {BURGER_INGREDIENT_TYPE} from '../../utils/constants';
export default class BurgerConstructor extends Component {
  submit = () => {}
  render() {   
    const summ = this.props.burgerConstructor.reduce((accum, item) => accum + item.price, 0);
    return (
      <form className={styles.main + ' mr-5 ml-5 mt-25'} onSubmit={this.submit}>
        <section className={styles.list}>
          {this.props.burgerConstructor.map((item, index) => (
              <ListConstructor
                key={item['_id'] + '_' + index}
                __id={item['_id'] + '_' + index}
                delIngredient={this.props.delIngredient}
                index={index}
                length={this.props.burgerConstructor.length}
                {...item}
              />
            ))}
        </section>
        <section className={styles.submit + ' mt-10'}>
          <PriceIcon type='medium' price={summ}/>
          <Button extraClass='ml-10' htmlType="submit" type="primary" size="large">
            Оформить заказ
          </Button>
        </section>
      </form>
    )
  }
}
BurgerConstructor.propTypes = {
  burgerConstructor: PropTypes.arrayOf(BURGER_INGREDIENT_TYPE.isRequired).isRequired
}
