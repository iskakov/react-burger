import { getIngredients } from "../../utils/api";
import {  INGREDIENT_PRELOAD, INGREDIENT_LOAD, INGREDIENT_ERROR, INGREDIENT_INC_COUNTER, INGREDIENT_DEC_COUNTER, CLEAR_COUNTERS} from "../actions/burger-ingredients"; 
const initialState = {
  ingredients: [],
  ingredientsPreload: false,
  ingredientsError: false,
  errorMessage: ''
}


export const burgerIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case INGREDIENT_PRELOAD: 
      return {...state, ingredientsPreload: true}
    case INGREDIENT_LOAD: 
      return {...state, ingredientsPreload: false, ingredientsError: false, ingredients: action.payload.map((item) => {return {...item, count: 0}})}
    case INGREDIENT_ERROR: 
      return {...state, ingredientsPreload: false, ingredientsError: true, errorMessage: action.payload}
    case INGREDIENT_INC_COUNTER: 
      return {...state, ingredients: state.ingredients.map(item => item['_id'] === action.payload ? {...item, count: ++item.count} : item)}
    case INGREDIENT_DEC_COUNTER: 
      return {...state, ingredients: state.ingredients.map(item => item['_id'] === action.payload ? {...item, count: --item.count}: item)}
    case CLEAR_COUNTERS: 
      return {...state, ingredients: state.ingredients.map(item => {return {...item, count: 0}})}
    default: 
      return state;
  }
}

export const getIngredientsAction = () => {
  return function(dispatch) {
    dispatch({type: INGREDIENT_PRELOAD})
    getIngredients().then(res => {
      if (res && res.success) {
        dispatch({type: INGREDIENT_LOAD, payload: res.data})
      } else {
        dispatch({type: INGREDIENT_ERROR, payload: res.message})
      }
    });
  };
}
