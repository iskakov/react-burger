import { SELECT_INGREDIENT, CLEAR_IGREDIENT} from "../actions/burger-ingredient"

const initialState = {
  ingredient: null,
}

export const burgerIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT:
      return {...state, ingredient: action.payload}

    case CLEAR_IGREDIENT:
      return {...state, ingredient: null}
    default:
      return state
  }
}
