import { combineReducers } from 'redux';
import {burgerConstructorReducer} from './burger-constructor';
import {burgerIngredientsReducer} from './burger-ingredients';
import {burgerIngredientReducer} from './burger-ingredient';
import {orderReducer} from './order';
import { userReducer } from './user';
import { feedsReducer } from './feeds';
import { feedReducer } from './feed';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
  orders: ordersReducer,
  feed: feedReducer,
  feeds: feedsReducer,
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  burgerIngredient: burgerIngredientReducer,
  order: orderReducer,
  user: userReducer
})