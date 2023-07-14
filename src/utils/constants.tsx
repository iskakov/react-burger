import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactNode } from 'react';

enum TYPE_OF_CATEGORY {
  bun = 'bun',
  sauce = 'sauce',
  main = 'main'
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

const WS_BASE_URL = 'wss://norma.nomoreparties.space'
const FEEDS_URL = `${WS_BASE_URL}/orders/all`
const ORDERS_URL = `${WS_BASE_URL}/orders`

type categries = TYPE_OF_CATEGORY.bun | TYPE_OF_CATEGORY.sauce | TYPE_OF_CATEGORY.main

export type TCategroies = {
  [fw in categries]?: Array<IBurgerType>;
}

export interface IBurgerType {
  '_id': Readonly<string>;
  '__v': Readonly<number>;
  name: Readonly<string>;
  type: Readonly<string>;
  proteins: Readonly<number>;
  fat: Readonly<number>;
  carbohydrates: Readonly<number>;
  calories: Readonly<number>;
  price: Readonly<number>;
  image: Readonly<string>;
  image_mobile: Readonly<string>;
  image_large: Readonly<string>;
  count?: number;
};

export type TAction<TTypeAction, TTypePayload={}>= {
  readonly type: TTypeAction,
  readonly payload?: TTypePayload
}

export interface IFeed<TTypeIngredients> {
  '_id': string,
  ingredients: TTypeIngredients,
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type IFeedApi = IFeed<Array<string>>;

export interface IBurgerTypeConstructor extends IBurgerType {
  order?: number;
  isDrag?: boolean;
  uuid?: string;
}

export interface IUser {
  email: string,
  password?: string,
  name?: string
}

export interface IResetPassword extends IToken {
  password: string
}

export interface ICheckEmail {
  email: string
}

export interface IOrderBody {
  number: number,
  createdAt: string,
  ingredients: Array<IBurgerType>,
  name: string,
  ownner: IUser,
  price: number,
  status: string,
  updatedAt: string,
  '_id': string
}


export interface IToken {
  token: string
}

export type TResponseBody<TDataKey extends string = '', TDataType  = {}> = {
  [fw in TDataKey]?: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
} & {
  accessToken: string;
  refreshToken: string
} & {
  total?: number;
  totalToday?: number;
};

export type TWSResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [fw in TDataKey]?: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
} & {
  total?: number;
  totalToday?: number;
};

const MAIN_ROUTE = '/';
const PROFILE_ROUTE = '/profile';
const INGREDIENT_ROUTE = '/ingredients/:id';

const CATEGORY_ON_RUSSIAN = {
  [TYPE_OF_CATEGORY.bun]: 'Булки',
  [TYPE_OF_CATEGORY.main]: 'Начинки',
  [TYPE_OF_CATEGORY.sauce]: 'Соусы'
};

const getNavIcon = (icon: string, active: boolean): ReactNode | null => {
  let iconNode: ReactNode | null = null
  switch (icon) {
    case 'burger':
      iconNode = (<BurgerIcon type={active ? 'primary' : 'secondary'} />)
      break;

    case 'list':
      iconNode = (<ListIcon type={active ? 'primary' : 'secondary'} />)
      break;
  
    default:
      iconNode = (<ProfileIcon type={active ? 'primary' : 'secondary'} />)
      break;
  }
  return iconNode;
}

function bubleSort(first: IBurgerTypeConstructor, second: IBurgerTypeConstructor): number {
  if (!isNaN(first.order) && !isNaN(second.order)) {
    if (first.order > second.order) {
      return 1;
    }
  
    if (first.order < second.order) {
      return -1;
    }
  }
  return 0;
}


export function parseDate(date: string): string {
  let newDate = '';
  const currentDate = new Date();
  const parsedDate = new Date(date);
  const Difference_In_Time = currentDate.getTime() - parsedDate.getTime();
  const Difference_In_Days = Number.parseInt(Difference_In_Time / (1000 * 3600 * 24) + '');
  switch(Difference_In_Days) {
    case 0:
      newDate += 'Сегодня, ';
      break;
    case 1:
      newDate += 'Вчера, ';
      break;
    case 2:
    case 3:
    case 4: 
      newDate += Difference_In_Days + ' дня назад, ';
      break;
    default: 
      newDate += Difference_In_Days + ' дней назад, ';
      break;
  }
  newDate += parsedDate.getHours() + ':' + parsedDate.getMinutes();
  return newDate;
}
export {
  TYPE_OF_CATEGORY,
  FEEDS_URL,
  ORDERS_URL,
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
};

