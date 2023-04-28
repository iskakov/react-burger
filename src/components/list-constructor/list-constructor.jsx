import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './list-constructor.module.css'
import { TYPE_OF_CATEGORY, BURGER_TYPE } from '../../utils/constants';
import PropTypes from 'prop-types';

const ListConstructor = (props) => {
  return (
    <div className={styles.main + (props.type === TYPE_OF_CATEGORY.bun ? ' ml-8': '') + ' mb-4'}>
      {props.type !== TYPE_OF_CATEGORY.bun && (
        <div className='mr-2'>
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
      type={props.index === 0 ? 'top' : (props.index === props.length - 1 ? 'bottom' : '')}
      isLocked={props.type === TYPE_OF_CATEGORY.bun}
      text={props.name}
      price={props.price}
      thumbnail={props.image}
      handleClose={e => props.delIngredient(props['__id'])} />
    </div>
  );
}

ListConstructor.propTypes = {
  ...BURGER_TYPE,
  delIngredient: PropTypes.func.isRequired
};

export default ListConstructor;
