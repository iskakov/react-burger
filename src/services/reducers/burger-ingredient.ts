import { IBurgerType } from "../../utils/constants";
import { TBurgerIngredientActions } from "../actions/burger-ingredient";
import { SELECT_INGREDIENT, CLEAR_IGREDIENT, INGREDIENT_LOAD, INGREDIENT_ERROR, INGREDIENT_PRELOAD} from "../constants/burger-ingredient"
interface IBurgerIngredientType {
  ingredient: IBurgerType | null;
  load: boolean;
  error: boolean;
  errorMessage: string;
}
export const initialState: IBurgerIngredientType = {
  ingredient: null,
  load: false,
  error: false,
  errorMessage: ''
}

export const burgerIngredientReducer = (state: IBurgerIngredientType = initialState, action: TBurgerIngredientActions): IBurgerIngredientType => {
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