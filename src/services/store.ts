
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TBurgerConstructorActions } from './actions/burger-constructor';
import { TBurgerIngredientActions } from './actions/burger-ingredient';
import { TBurgerIngredientsActions } from './actions/burger-ingredients';
import { TOrderActions } from './actions/order';
import { TUserActions } from './actions/user';
import { TFeedsActions, TWSFeedsActionTypes, TWSFeedsActions, feedsOnCloseAction, feedsOnErrorAction, feedsOnMessageAction, feedsOnOpenAction } from './actions/feeds';
import { FEEDS_ON_CLOSE, FEEDS_ON_INIT } from './constants/feeds';
import { FEEDS_URL, IFeedApi, ORDERS_URL, TWSResponseBody } from '../utils/constants';
import { socketMiddleware } from './middlewares/socketMiddleware';
import { TFeedActions } from './actions/feed';
import { TOrdersActions, TWSOrdersActionTypes, TWSOrdersActions, ordersOnCloseAction, ordersOnErrorAction, ordersOnMessageAction, ordersOnOpenAction } from './actions/orders';
import { ORDERS_ON_CLOSE, ORDERS_ON_INIT } from './constants/orders';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const wSFeedActions: TWSFeedsActions = {
  onOpen: feedsOnOpenAction,
  onClose: feedsOnCloseAction,
  onError: feedsOnErrorAction,
  onMessage: feedsOnMessageAction
}

const wsFeedActionTypes: TWSFeedsActionTypes = {
  wsInitType: FEEDS_ON_INIT,
  wsClose: FEEDS_ON_CLOSE
}

const wSOrdersActions: TWSOrdersActions = {
  onOpen: ordersOnOpenAction,
  onClose: ordersOnCloseAction,
  onError: ordersOnErrorAction,
  onMessage: ordersOnMessageAction
}

const wsOrdersctionTypes: TWSOrdersActionTypes = {
  wsInitType: ORDERS_ON_INIT,
  wsClose: ORDERS_ON_CLOSE
}
export type TWSFeedAndOrdersResponce = TWSResponseBody<'orders', Array<IFeedApi>>;
export type TWSAppActions = TWSFeedsActions | TWSOrdersActions;
export type TWSAppActionTypes = TWSFeedsActionTypes | TWSOrdersActionTypes;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(FEEDS_URL, wSFeedActions, wsFeedActionTypes), socketMiddleware(ORDERS_URL, wSOrdersActions, wsOrdersctionTypes, true)));
export type TApplicationActions = TBurgerConstructorActions | TBurgerIngredientActions | TBurgerIngredientsActions | TOrderActions | TUserActions | TFeedsActions | TFeedActions | TOrdersActions;
export const store = createStore(rootReducer, enhancer);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;



export const getBurgerIngredients = (store: RootState) => store.burgerIngredients
export const getFeeds = (store: RootState) => store.feeds
export const getOrders = (store: RootState) => store.orders
export const getFeed = (store: RootState) => store.feed
export const getBurgerConstructor = (store: RootState) => store.burgerConstructor
export const getBurgerIngredient = (store: RootState) => store.burgerIngredient
export const getOrder = (store: RootState) => store.order
export const getUserStore = (store: RootState) => store.user