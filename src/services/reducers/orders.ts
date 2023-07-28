
import { IFeedApi } from "../../utils/constants";
import { TOrdersActions } from "../actions/orders";
import { ORDERS_ON_CLOSE, ORDERS_ON_ERROR, ORDERS_ON_MESSAGE, ORDERS_ON_OPEN } from "../constants/orders";

interface IFeedStateType {
  orders: Array<IFeedApi>;
  total: number;
  totalToday: number;
  isOpen: boolean;
  error: boolean;
  errorMessage: string;
}
export const initialState: IFeedStateType = {
  orders: [],
  total: 0,
  totalToday: 0,
  isOpen: false,
  error: false,
  errorMessage: ''
}

export const ordersReducer = (state: IFeedStateType = initialState, action: TOrdersActions):  IFeedStateType => {
  switch(action.type) {
    case ORDERS_ON_OPEN: 
      return {...state, isOpen: true}
    case ORDERS_ON_CLOSE: 
      return {...state, isOpen: false} 
    case ORDERS_ON_ERROR: 
      return {...state, error: true, errorMessage: action.payload}
    case ORDERS_ON_MESSAGE: 
      return {...state, orders: action.payload.orders, total: action.payload.total, totalToday: action.payload.totalToday}
    default: 
      return state;
  }
}