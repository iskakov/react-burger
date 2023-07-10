import { newOrder } from "../../utils/api"
import { IOrderBody, TAction } from "../../utils/constants";
import { ORDER_ERROR, ORDER_LOAD, ORDER_PRELOAD } from "../constants/order"
import { AppDispatch, AppThunkAction } from "../store";
import { clearIngredientsAction } from "./burger-constructor";
import { clearCountersAction } from "./burger-ingredients";

export type TOrderLoadAction = TAction<typeof ORDER_LOAD, IOrderBody>;
export type TOrderPreloadAction = TAction<typeof ORDER_PRELOAD>;
export type TOrderErrorAction = TAction<typeof ORDER_ERROR, string>;

export type TOrderActions = TOrderLoadAction | TOrderPreloadAction | TOrderErrorAction;

export const orderLoadAction = (order: IOrderBody): TOrderLoadAction => ({type: ORDER_LOAD, payload: order});
export const orderPreloadAction = (): TOrderPreloadAction => ({type: ORDER_PRELOAD});
export const orderErrorAction = (message: string): TOrderErrorAction => ({type: ORDER_ERROR, payload: message});

export const pushOrder = (ingredientIds): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    dispatch(orderPreloadAction())
    newOrder(ingredientIds).then(res => {
      if (res && res.success) {
        dispatch(orderLoadAction(res.order))
        dispatch(clearIngredientsAction())
        dispatch(clearCountersAction())
      } else {
        dispatch(orderErrorAction(res.message))
      }
    }).catch((res) => {
      dispatch(orderErrorAction(res.message))
    });
  }
}
