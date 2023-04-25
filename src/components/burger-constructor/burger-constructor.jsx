import { Component } from 'react'
import styles from './burger-constructor.module.css'
import ListConstructor from '../list-constructor/list-constructor'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import PriceIcon from '../price-icon/price-icon';
const burgerConstructor = PropTypes.shape({
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
export default class BurgerConstructor extends Component {
  submit = () => {}
  render() {   
    let summ = this.props.burgerConstructor.reduce((accum, item) => accum + item.price, 0);
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
  burgerConstructor: PropTypes.arrayOf(burgerConstructor).isRequired
}
