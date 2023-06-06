
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../services/reducers';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

export const getBurgerIngredients = (store => store.burgerIngredients)
export const getBurgerConstructor = (store => store.burgerConstructor)
export const getBurgerIngredient = (store => store.burgerIngredient)
export const getOrder = (store => store.order)
export const getUserStore = (store => store.user)