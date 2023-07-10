
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const getBurgerIngredients = (store: RootState) => store.burgerIngredients
export const getBurgerConstructor = (store: RootState) => store.burgerConstructor
export const getBurgerIngredient = (store: RootState) => store.burgerIngredient
export const getOrder = (store: RootState) => store.order
export const getUserStore = (store: RootState) => store.user