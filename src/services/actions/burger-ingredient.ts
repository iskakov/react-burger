import { getIngredientsAPI } from "../../utils/api"
import { IBurgerType, TAction } from "../../utils/constants";
import { CLEAR_IGREDIENT, INGREDIENT_ERROR, INGREDIENT_LOAD, INGREDIENT_PRELOAD, SELECT_INGREDIENT } from "../constants/burger-ingredient";
import { AppDispatch, AppThunkAction } from "../store"

export type TIngredientLoadAction = TAction<typeof INGREDIENT_LOAD, IBurgerType>;
export type TSelectIngredientAction = TAction<typeof SELECT_INGREDIENT, IBurgerType>;
export type TIngredientPreloadAction = TAction<typeof INGREDIENT_PRELOAD>;
export type TIngredientErrorAction = TAction<typeof INGREDIENT_ERROR, string>;
export type TClearIngredientAction = TAction<typeof CLEAR_IGREDIENT>;

export type TBurgerIngredientActions = TIngredientLoadAction | TIngredientPreloadAction | TIngredientErrorAction | TClearIngredientAction | TSelectIngredientAction;

export const ingredientLoadAction = (ingredient: IBurgerType): TIngredientLoadAction => ({type: INGREDIENT_LOAD, payload: ingredient});
export const selectIngredientAction = (ingredient: IBurgerType): TSelectIngredientAction => ({type: SELECT_INGREDIENT, payload: ingredient});
export const ingredientPreloadAction = (): TIngredientPreloadAction => ({type: INGREDIENT_PRELOAD});
export const ingredientErrorAction = (message: string): TIngredientErrorAction => ({type: INGREDIENT_ERROR, payload: message});
export const clearIngredientAction = (): TClearIngredientAction => ({type: CLEAR_IGREDIENT});

export const getIngredient = (id: string): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    dispatch(ingredientPreloadAction())
    getIngredientsAPI().then(res => {
      if (res && res.success) {
        dispatch(ingredientLoadAction(res.data.find(item => item['_id'] === id)))
      } else {
        dispatch(ingredientErrorAction(res.message))
      }
    });
  };
}