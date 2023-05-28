import { TYPE_OF_CATEGORY, bubleSort } from "../../utils/constants";
import { ADD_INGREDIENT, DEL_INGREDIENT, CLEAR_INGREDIENTS, SORT, CHANGE_ORDER, CHANGE_DRAG, ADD_BUN, DEL_BUN} from "../actions/burger-constructor";
import { INGREDIENTS_INC_COUNTER, INGREDIENTS_DEC_COUNTER} from "../actions/burger-ingredients"; 

const initialState = {
  bun: null,
  ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, {...action.payload, order: action.order, uuid: action.uuid}]}
    case ADD_BUN:
      return {...state, bun: {...action.payload, order: action.order}}
    case DEL_BUN:
      return {...state, bun: null}
    case DEL_INGREDIENT:
      return {...state, ingredients: state.ingredients.filter(item => item.uuid !== action.payload.uuid)}
    case CHANGE_ORDER:
      return {...state, ingredients: [...state.ingredients.map(item => action.dragIndex === item.order ? {...item, order: action.hoverIndex} : action.hoverIndex === item.order ?  {...item, order: action.dragIndex} : item)]}
    case SORT:
      return {...state, ingredients: [...state.ingredients.sort(action.sortingFunction)]}
    case CLEAR_INGREDIENTS:
      return {...state, ingredients: [], bun: null}
    case CHANGE_DRAG:
      return {...state, ingredients: [...state.ingredients.map((item) => item.uuid === action.uuid ? {...item, isDrag: action.isDrag} :  {...item})]}
    default: 
      return state;
  }
}

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
