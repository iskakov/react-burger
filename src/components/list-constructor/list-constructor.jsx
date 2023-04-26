import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Component } from 'react';
import styles from './list-constructor.module.css'
import { TYPE_OF_CATEGORY, BURGER_TYPE } from '../../utils/constants';

class ListConstructor extends Component {
  render() {
    return (
      <div className={styles.main + (this.props.type === TYPE_OF_CATEGORY.bun ? ' ml-8': '') + ' mb-4'}>
        {this.props.type !== TYPE_OF_CATEGORY.bun && (
          <div className='mr-2'>
            <DragIcon type="primary" />
          </div>
        )}
        <ConstructorElement
        type={this.props.index === 0 ? 'top' : (this.props.index === this.props.length - 1 ? 'bottom' : '')}
        isLocked={this.props.type === TYPE_OF_CATEGORY.bun}
        text={this.props.name}
        price={this.props.price}
        thumbnail={this.props.image}
        handleClose={e => this.props.delIngredient(this.props['__id'])} />
      </div>
    );
  }
}

ListConstructor.propTypes = BURGER_TYPE;

export default ListConstructor;
