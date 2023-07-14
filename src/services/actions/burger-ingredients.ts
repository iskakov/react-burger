import { getIngredientsAPI } from "../../utils/api"
import { IBurgerType, TAction } from "../../utils/constants";
import { CLEAR_COUNTERS, INGREDIENTS_DEC_COUNTER, INGREDIENTS_ERROR, INGREDIENTS_INC_COUNTER, INGREDIENTS_LOAD, INGREDIENTS_PRELOAD } from "../constants/burger-ingredients";
import { AppDispatch, AppThunkAction } from "../store";

export type TIngredientsLoadAction = TAction<typeof INGREDIENTS_LOAD, Array<IBurgerType>>;
export type TIngredientIncCounterAction = TAction<typeof INGREDIENTS_INC_COUNTER, IBurgerType['_id']>;
export type TIngredientDecCounterAction = TAction<typeof INGREDIENTS_DEC_COUNTER, IBurgerType['_id']>;
export type TIngredientsPreloadAction = TAction<typeof INGREDIENTS_PRELOAD>;
export type TIngredientsErrorAction = TAction<typeof INGREDIENTS_ERROR, string>;
export type TClearCountersAction = TAction<typeof CLEAR_COUNTERS>;

export type TBurgerIngredientsActions = TIngredientsLoadAction | TIngredientIncCounterAction | TIngredientDecCounterAction
| TIngredientsPreloadAction | TIngredientsErrorAction | TClearCountersAction;

export const ingredientsLoadAction = (ingredients: Array<IBurgerType>): TIngredientsLoadAction => ({type: INGREDIENTS_LOAD, payload: ingredients});
export const ingredientsPreloadAction = (): TIngredientsPreloadAction => ({type: INGREDIENTS_PRELOAD});
export const ingredientDecCounterAction = (id: string): TIngredientDecCounterAction => ({type: INGREDIENTS_DEC_COUNTER, payload: id});
export const ingredientIncCounterAction = (id: string): TIngredientIncCounterAction => ({type: INGREDIENTS_INC_COUNTER, payload: id});
export const ingredientsErrorAction = (message: string): TIngredientsErrorAction => ({type: INGREDIENTS_ERROR, payload: message});
export const clearCountersAction = (): TClearCountersAction => ({type: CLEAR_COUNTERS});

export const getIngredients = (): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    dispatch(ingredientsPreloadAction())
    getIngredientsAPI().then(res => {
      if (res && res.success) {
        dispatch(ingredientsLoadAction(res.data))
      } else {
        dispatch(ingredientsErrorAction(res.message))
      }
    });
  };
}