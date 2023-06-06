import {  INGREDIENTS_PRELOAD, INGREDIENTS_LOAD, INGREDIENTS_ERROR, INGREDIENTS_INC_COUNTER, INGREDIENTS_DEC_COUNTER, CLEAR_COUNTERS} from "../actions/burger-ingredients"; 
const initialState = {
  ingredients: [],
  ingredientsPreload: false,
  ingredientsError: false,
  errorMessage: ''
}


export const burgerIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case INGREDIENTS_PRELOAD: 
      return {...state, ingredientsPreload: true}
    case INGREDIENTS_LOAD: 
      return {...state, ingredientsPreload: false, ingredientsError: false, ingredients: action.payload.map((item) => {return {...item, count: 0}})}
    case INGREDIENTS_ERROR: 
      return {...state, ingredientsPreload: false, ingredientsError: true, errorMessage: action.payload}
    case INGREDIENTS_INC_COUNTER: 
      return {...state, ingredients: state.ingredients.map(item => item['_id'] === action.payload ? {...item, count: ++item.count} : item)}
    case INGREDIENTS_DEC_COUNTER: 
      return {...state, ingredients: state.ingredients.map(item => item['_id'] === action.payload ? {...item, count: --item.count}: item)}
    case CLEAR_COUNTERS: 
      return {...state, ingredients: state.ingredients.map(item => {return {...item, count: 0}})}
    default: 
      return state;
  }
}