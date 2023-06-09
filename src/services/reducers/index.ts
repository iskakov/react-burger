import { combineReducers } from 'redux';
import {burgerConstructorReducer} from './burger-constructor';
import {burgerIngredientsReducer} from './burger-ingredients';
import {burgerIngredientReducer} from './burger-ingredient';
import {orderReducer} from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  burgerIngredient: burgerIngredientReducer,
  order: orderReducer,
  user: userReducer
})