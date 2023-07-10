import { TAction } from "../../utils/constants";
import {  ORDERS_ON_CLOSE, ORDERS_ON_ERROR, ORDERS_ON_INIT, ORDERS_ON_MESSAGE, ORDERS_ON_OPEN } from "../constants/orders";
import { TWSFeedAndOrdersResponce } from "../store";

export type TOrdersOnInitAction = TAction<typeof ORDERS_ON_INIT>;
export type TOrdersOnOpenAction = TAction<typeof ORDERS_ON_OPEN>;
export type TOrdersOnCloseAction = TAction<typeof ORDERS_ON_CLOSE>;
export type TOrdersOnErrorAction = TAction<typeof ORDERS_ON_ERROR, string>;
export type TOrdersOnMessageAction = TAction<typeof ORDERS_ON_MESSAGE, TWSFeedAndOrdersResponce>;

export type TOrdersActions = TOrdersOnOpenAction | TOrdersOnCloseAction | TOrdersOnErrorAction | TOrdersOnMessageAction | TOrdersOnInitAction;

export const ordersOnOpenAction = (): TOrdersOnOpenAction => ({type: ORDERS_ON_OPEN});
export const ordersOnInitAction = (): TOrdersOnInitAction => ({type: ORDERS_ON_INIT});
export const ordersOnCloseAction = (): TOrdersOnCloseAction => ({type: ORDERS_ON_CLOSE});
export const ordersOnErrorAction = (message: string): TOrdersOnErrorAction => ({type: ORDERS_ON_ERROR, payload: message});
export const ordersOnMessageAction = (responce: TWSFeedAndOrdersResponce): TOrdersOnMessageAction => ({type: ORDERS_ON_MESSAGE, payload: responce});

export type TWSOrdersActions = {
  onOpen: typeof ordersOnOpenAction;
  onClose: typeof ordersOnCloseAction;
  onError: typeof ordersOnErrorAction;
  onMessage: typeof ordersOnMessageAction;
}

export type TWSOrdersActionTypes = {
  wsInitType: typeof ORDERS_ON_INIT;
}