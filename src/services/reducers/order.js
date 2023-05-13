import { newOrder } from "../../utils/api";
import {  ORDER_PRELOAD, ORDER_LOAD, ORDER_ERROR} from "../actions/order";
const initialState = {
  order: null,
  orderPreload: false,
  orderError: false,
  errorMessage: ''
}

export const orderReducer = (state = initialState, action) => {
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

export const pushOrder = (ingredientIds) => {
  return function(dispatch) {
    dispatch({type: ORDER_PRELOAD})
    newOrder(ingredientIds).then(res => {
      if (res && res.success) {
        dispatch({type: ORDER_LOAD, payload: res})
      } else {
        dispatch({type: ORDER_ERROR, payload: res.message})
      }
    }).catch((res) => {
      dispatch({type: ORDER_ERROR, payload: res.message})
    });
  }
}
