import { IOrderBody } from "../../utils/constants";
import { TOrderActions } from "../actions/order";
import {  ORDER_PRELOAD, ORDER_LOAD, ORDER_ERROR} from "../constants/order";
interface IOrderType {
  order: IOrderBody;
  orderPreload: boolean;
  orderError: boolean;
  errorMessage: string;
}

const initialState: IOrderType = {
  order: null,
  orderPreload: false,
  orderError: false,
  errorMessage: ''
}

export const orderReducer = (state: IOrderType = initialState, action: TOrderActions): IOrderType => {
  switch(action.type) {
    case ORDER_PRELOAD: 
      return {...state, orderPreload: true}
    case ORDER_LOAD: 
      return {...state, orderPreload: false, orderError: false, order: action.payload}
    case ORDER_ERROR: 
      return {...state, orderPreload: false, orderError: true, errorMessage: action.payload}
    default: 
      return state;
  }
}
