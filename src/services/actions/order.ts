import { newOrder } from "../../utils/api"
import { CLEAR_INGREDIENTS } from "./burger-constructor"
import { CLEAR_COUNTERS } from "./burger-ingredients"

export const ORDER_PRELOAD = 'ORDER_PRELOAD'
export const ORDER_LOAD = 'ORDER_LOAD'
export const ORDER_ERROR = 'ORDER_ERROR'

export const pushOrder = (ingredientIds) => {
  return function(dispatch) {
    dispatch({type: ORDER_PRELOAD})
    newOrder(ingredientIds).then(res => {
      if (res && res.success) {
        dispatch({type: ORDER_LOAD, payload: res})
        dispatch({type: CLEAR_INGREDIENTS})
        dispatch({type: CLEAR_COUNTERS})
      } else {
        dispatch({type: ORDER_ERROR, payload: res.message})
      }
    }).catch((res) => {
      dispatch({type: ORDER_ERROR, payload: res.message})
    });
  }
}
