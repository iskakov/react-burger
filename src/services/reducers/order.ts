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
