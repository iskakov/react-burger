import { TYPE_OF_CATEGORY, bubleSort } from "../../utils/constants";
import { ADD_INGREDIENT, DEL_INGREDIENT, DEC_SUMM, INC_SUMM, CHANGE_ORDER, SORT} from "../actions/burger-constructor";
import { INGREDIENT_INC_COUNTER, INGREDIENT_DEC_COUNTER} from "../actions/burger-ingredients"; 

const initialState = {
  ingredients: [],
  summ: 0
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {...state, ingredients: action.isBun ? [{...action.payload, order: -1}, ...state.ingredients] : [...state.ingredients, {...action.payload, order: action.order}]}
    case DEL_INGREDIENT:
      return {...state, ingredients: state.ingredients.filter((item, index) => item['_id'] !== action.payload['_id'] || index !== action.index)}
    case INC_SUMM: 
      return {...state, summ: state.summ + action.payload}
    case DEC_SUMM: 
      return {...state, summ: state.summ - action.payload}
    case CHANGE_ORDER:
      return {...state, ingredients: [...state.ingredients.map(item => action.dragIndex === item.order ? {...item, order: action.hoverIndex} : action.hoverIndex === item.order ?  {...item, order: action.dragIndex} : item)]}
    case SORT:
      return {...state, ingredients: [...state.ingredients.sort(action.sortingFunction)]}
    default: 
      return state;
  }
}

export const addIngredient = (ingredient) => {
  return function(dispatch, stateFunction) {
    const add = (isBun, order) => {
      dispatch({type: ADD_INGREDIENT, payload: ingredient, isBun, order})
      if (isBun) {
        dispatch({type: INGREDIENT_INC_COUNTER, payload: ingredient['_id']})
        dispatch({type: INC_SUMM, payload: ingredient.price})
      }
      dispatch({type: INC_SUMM, payload: ingredient.price})
      dispatch({type: INGREDIENT_INC_COUNTER, payload: ingredient['_id']})
    }
    const state = stateFunction();
    const order =  Math.max(...state.burgerConstructor.ingredients.map(item => item.order))
    if (ingredient.type === TYPE_OF_CATEGORY.bun) {
      let bunInConstructor = state.burgerConstructor.ingredients.find(item => item.type === TYPE_OF_CATEGORY.bun);
      if (!bunInConstructor) {
        add(true, order !== -1 ? order + 1 : 0);
      } else {
        bunInConstructor = state.burgerConstructor.ingredients.find(item => item.type === TYPE_OF_CATEGORY.bun && item['_id'] !== ingredient['_id']);
        if (bunInConstructor && bunInConstructor['_id'] !== ingredient['_id']) {
          dispatch(delIngredient(bunInConstructor, true, 0))
          add(true, order !== -1 ? order + 1 : 0)
        }
      }
    } else {
      add(false, order !== -1 ? order + 1 : 0)
    }
  }
}

export const delIngredient = (ingredient, isBun, index) => {
  return function(dispatch) {
    dispatch({type: DEL_INGREDIENT, payload: ingredient, isBun, index})
    if (isBun) {
      dispatch({type: INGREDIENT_DEC_COUNTER, payload: ingredient['_id']})
      dispatch({type: DEC_SUMM, payload: ingredient.price})
    }
    dispatch({type: DEC_SUMM, payload: ingredient.price})
    dispatch({type: INGREDIENT_DEC_COUNTER, payload: ingredient['_id']})
  }
}

export const sortingIngredients = (dragIndex, hoverIndex) => {
  return function(dispatch) {
    dispatch({type: CHANGE_ORDER, dragIndex, hoverIndex})

    dispatch({type: SORT, sortingFunction: bubleSort})

  }
}
