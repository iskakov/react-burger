import { getIngredientsAPI } from "../../utils/api"

export const SELECT_INGREDIENT = 'SELECT_INGREDIENT'
export const INGREDIENT_PRELOAD = 'INGREDIENT_PRELOAD'
export const INGREDIENT_LOAD = 'INGREDIENT_LOAD'
export const INGREDIENT_ERROR = 'INGREDIENT_ERROR'
export const CLEAR_IGREDIENT = 'CLEAR_IGREDIENT'

export const getIngredient = (id) => {
  return function(dispatch) {
    dispatch({type: INGREDIENT_PRELOAD})
    getIngredientsAPI().then(res => {
      if (res && res.success) {
        dispatch({type: INGREDIENT_LOAD, payload: res.data.find(item => item['_id'] === id)})
      } else {
        dispatch({type: INGREDIENT_ERROR, payload: res.message})
      }
    });
  };
}