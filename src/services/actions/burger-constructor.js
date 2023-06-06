import { TYPE_OF_CATEGORY, bubleSort } from "../../utils/constants"
import { INGREDIENTS_DEC_COUNTER, INGREDIENTS_INC_COUNTER } from "./burger-ingredients"

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_BUN = 'ADD_BUN'
export const DEL_BUN = 'DEL_BUN'
export const DEL_INGREDIENT = 'DEL_INGREDIENT'
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS'
export const CHANGE_ORDER = 'CHANGE_ORDER'
export const CHANGE_DRAG = 'CHANGE_DRAG'
export const SORT = 'SORT'

export const addIngredient = (ingredient, uuid) => {
  return function(dispatch, stateFunction) {
    const add = (isBun, order) => {
      if (isBun) {
        dispatch({type: ADD_BUN, payload: ingredient})
        dispatch({type: INGREDIENTS_INC_COUNTER, payload: ingredient['_id']})
      } else {
        dispatch({type: ADD_INGREDIENT, payload: ingredient, order, uuid})
      }
      dispatch({type: INGREDIENTS_INC_COUNTER, payload: ingredient['_id']})
    }
    const state = stateFunction();
    const order =  Math.max(...state.burgerConstructor.ingredients.map(item => item.order))
    if (ingredient.type === TYPE_OF_CATEGORY.bun) {
      if (!state.burgerConstructor.bun) {
        add(true);
      } else {
        dispatch(delIngredient(state.burgerConstructor.bun, true, 0))
        add(true)
      }
    } else {
      add(false, Number.isFinite(order) && order !== -1 ? order + 1 : 0)
    }
  }
}

export const delIngredient = (ingredient, isBun) => {
  return function(dispatch) {
    if (isBun) {
      dispatch({type: DEL_BUN})
      dispatch({type: INGREDIENTS_DEC_COUNTER, payload: ingredient['_id']})
    } else {
      dispatch({type: DEL_INGREDIENT, payload: ingredient})
    }
    dispatch({type: INGREDIENTS_DEC_COUNTER, payload: ingredient['_id']})
  }
}

export const sortingIngredients = (dragIndex, hoverIndex) => {
  return function(dispatch) {
    dispatch({type: CHANGE_ORDER, dragIndex, hoverIndex})
    dispatch({type: SORT, sortingFunction: bubleSort})
  }
}