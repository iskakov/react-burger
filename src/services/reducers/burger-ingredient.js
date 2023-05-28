import { getIngredientAPI, getIngredientsAPI } from "../../utils/api"
import { SELECT_INGREDIENT, CLEAR_IGREDIENT, INGREDIENT_LOAD, INGREDIENT_ERROR, INGREDIENT_PRELOAD} from "../actions/burger-ingredient"

const initialState = {
  ingredient: null,
  load: false,
  error: false,
  errorMessage: ''
}

export const burgerIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_PRELOAD: 
      return {...state, load: true}
    case INGREDIENT_LOAD: 
      return {...state, load: false, error: false, ingredient: action.payload}
    case INGREDIENT_ERROR: 
      return {...state, load: false, error: true, errorMessage: action.payload}
    case SELECT_INGREDIENT:
      return {...state, ingredient: action.payload}

    case CLEAR_IGREDIENT:
      return {...state, ingredient: null}
    default:
      return state
  }
}

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
