import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Component } from 'react';
import styles from './list-constructor.module.css'

class ListConstructor extends Component {
  render() {
    return (
      <section className={styles.main + (this.props.type === 'bun' ? ' ml-8': '') + ' mb-4'}>
        {this.props.type !== 'bun' && (
          <DragIcon type="primary" />
        )}
        <ConstructorElement
        extraClass='ml-2'
        type={this.props.index === 0 ? 'top' : (this.props.index === this.props.length ? 'bottom' : '')}
        isLocked={this.props.type === 'bun'}
        text={this.props.name}
        price={this.props.price}
        thumbnail={this.props.image}
        handleClose={e => this.props.delIngredient(this.props['__id'])} />
      </section>
    );
  }
}

export default ListConstructor;
