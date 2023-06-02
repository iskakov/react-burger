import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TYPE_OF_CATEGORY = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main'
}

const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = `${BASE_URL}/ingredients`;
const LOGIN_URL = `${BASE_URL}/auth/login`;
const REGISTER_URL = `${BASE_URL}/auth/register`;
const LOGOUT_URL = `${BASE_URL}/auth/logout`;
const REFRESH_TOKEN_URL = `${BASE_URL}/auth/token`;
const MAIL_URL = `${BASE_URL}/password-reset`;
const RESET_PASSWORD_URL = MAIL_URL + '/reset';
const ORDER_URL = `${BASE_URL}/orders`;
const USER_URL = `${BASE_URL}/auth/user`;

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

const MAIN_ROUTE = '/';
const PROFILE_ROUTE = '/profile';
const INGREDIENT_ROUTE = '/ingredients/:id';

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

function bubleSort(first, second) {
  if (first.order > second.order) {
    return 1;
  }

  if (first.order < second.order) {
    return -1;
  }

  return 0;
}

export {
  TYPE_OF_CATEGORY,
  BURGER_INGREDIENT_TYPE,
  BURGER_TYPE,
  CATEGORY_ON_RUSSIAN,
  INGREDIENTS_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
  REFRESH_TOKEN_URL,
  ORDER_URL,
  USER_URL,
  MAIL_URL,
  MAIN_ROUTE,
  INGREDIENT_ROUTE,
  PROFILE_ROUTE,
  getNavIcon,
  bubleSort
}