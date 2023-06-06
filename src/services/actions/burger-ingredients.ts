import { getIngredientsAPI } from "../../utils/api"

export const INGREDIENTS_PRELOAD = 'INGREDIENTS_PRELOAD'
export const INGREDIENTS_LOAD = 'INGREDIENTS_LOAD'
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR'
export const INGREDIENTS_INC_COUNTER = 'INGREDIENTS_INC_COUNTER'
export const INGREDIENTS_DEC_COUNTER = 'INGREDIENTS_DEC_COUNTER'
export const CLEAR_COUNTERS = 'CLEAR_COUNTERS'

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({type: INGREDIENTS_PRELOAD})
    getIngredientsAPI().then(res => {
      if (res && res.success) {
        dispatch({type: INGREDIENTS_LOAD, payload: res.data})
      } else {
        dispatch({type: INGREDIENTS_ERROR, payload: res.message})
      }
    });
  };
}