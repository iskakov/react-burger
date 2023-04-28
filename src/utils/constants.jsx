import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TYPE_OF_CATEGORY = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main'
}

const BURGER_INGREDIENT_TYPE = PropTypes.shape({
  '_id': PropTypes.string.isRequired,
  '__v': PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired
});

const BURGER_TYPE = {
  '_id': PropTypes.string.isRequired,
  '__v': PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired
};

const CATEGORY_ON_RUSSIAN = {
  [TYPE_OF_CATEGORY.bun]: 'Булки',
  [TYPE_OF_CATEGORY.main]: 'Начинки',
  [TYPE_OF_CATEGORY.sauce]: 'Соусы'
};

const getNavIcon = (icon, active) => {
  switch (icon) {
    case 'burger':
      icon = (<BurgerIcon type={active ? 'primary' : 'secondary'} />)
      break;

    case 'list':
      icon = (<ListIcon type={active ? 'primary' : 'secondary'} />)
      break;
  
    default:
      icon = (<ProfileIcon type={active ? 'primary' : 'secondary'} />)
      break;
  }
  return icon;
}

export {
  TYPE_OF_CATEGORY,
  BURGER_INGREDIENT_TYPE,
  BURGER_TYPE,
  CATEGORY_ON_RUSSIAN,
  getNavIcon
}