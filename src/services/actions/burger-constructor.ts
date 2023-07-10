import { ThunkAction } from "redux-thunk"
import { TAction, IBurgerTypeConstructor, TYPE_OF_CATEGORY, bubleSort } from "../../utils/constants"
import { AppDispatch, AppThunkAction, RootState } from "../store"
import { Action } from "redux"
import { ADD_BUN, ADD_INGREDIENT, CHANGE_DRAG, CHANGE_ORDER, CLEAR_INGREDIENTS, DEL_BUN, DEL_INGREDIENT, SORT } from "../constants/burger-constructor"
import { ingredientDecCounterAction, ingredientIncCounterAction } from "./burger-ingredients"

type TChangeOrderPayload = {
  dragIndex: number;
  hoverIndex: number;
}

type TAddIngredientPayload = {
  ingredient: IBurgerTypeConstructor;
  order: number;
  uuid: string;
}

type SortFunction = (firstIngredient: IBurgerTypeConstructor, secondIngredient: IBurgerTypeConstructor) => number

type TSortPayload = {
  sortingFunction: SortFunction;
}

type TChangeDrag = {
  isDrag: boolean;
  uuid: string;
}

export type TAddBunAction = TAction<typeof ADD_BUN, IBurgerTypeConstructor>;
export type TAddIngredientAction = TAction<typeof ADD_INGREDIENT, TAddIngredientPayload>;
export type TDelBunAction = TAction<typeof DEL_BUN>;
export type TDelIngredientAction = TAction<typeof DEL_INGREDIENT, IBurgerTypeConstructor>;
export type TSortAction = TAction<typeof SORT, TSortPayload>;
export type TChangeOrderAction = TAction<typeof CHANGE_ORDER, TChangeOrderPayload>;
export type TChangeDragAction = TAction<typeof CHANGE_DRAG, TChangeDrag>;
export type TClearIngredientsAction = TAction<typeof CLEAR_INGREDIENTS>;


export type TBurgerConstructorActions = TAddBunAction | TAddIngredientAction | TDelBunAction | TDelIngredientAction
| TSortAction | TChangeOrderAction | TChangeDragAction | TClearIngredientsAction;

export const addBunAction = (ingredient: IBurgerTypeConstructor): TAddBunAction => ({type: ADD_BUN, payload: ingredient});
export const addIngredientAction = (ingredient: IBurgerTypeConstructor, order: number, uuid: string): TAddIngredientAction => ({type: ADD_INGREDIENT, payload: {ingredient, order, uuid}});
export const delBunAction = (): TDelBunAction => ({type: DEL_BUN});
export const delIngredientAction = (ingredient: IBurgerTypeConstructor): TDelIngredientAction => ({type: DEL_INGREDIENT, payload: ingredient});
export const sortAction = (sortingFunction: TSortPayload): TSortAction => ({type: SORT, payload: sortingFunction});
export const changeOrderAction = (dragIndex: number, hoverIndex: number): TChangeOrderAction => ({type: CHANGE_ORDER, payload: {dragIndex, hoverIndex}});
export const changeDragAction = (isDrag: boolean, uuid: string): TChangeDragAction => ({type: CHANGE_DRAG, payload: {isDrag, uuid}});
export const clearIngredientsAction = (): TClearIngredientsAction => ({type: CLEAR_INGREDIENTS});


export const addIngredient = (ingredient: IBurgerTypeConstructor, uuid: string): AppThunkAction  => {
  return function(dispatch: AppDispatch, stateFunction) {
    const add = (isBun: boolean, order?: number): void => {
      if (isBun) {
        dispatch(addBunAction(ingredient))
        dispatch(ingredientIncCounterAction(ingredient['_id']))
      } else {
        dispatch(addIngredientAction(ingredient, order, uuid))
      }
      dispatch(ingredientIncCounterAction(ingredient['_id']))
    }
    const state = stateFunction();
    const order =  Math.max(...state.burgerConstructor.ingredients.map(item => item.order ? item.order : 0))
    if (ingredient.type === TYPE_OF_CATEGORY.bun) {
      if (!state.burgerConstructor.bun) {
        add(true);
      } else {
        dispatch(delIngredient(state.burgerConstructor.bun, true))
        add(true)
      }
    } else {
      add(false, Number.isFinite(order) && order !== -1 ? order + 1 : 0)
    }
  }
}

export const delIngredient = (ingredient: IBurgerTypeConstructor, isBun?: boolean): AppThunkAction => {
  return function(dispatch: AppDispatch) {
    if (isBun) {
      dispatch(delBunAction())
      dispatch(ingredientDecCounterAction(ingredient['_id']))
    } else {
      dispatch(delIngredientAction(ingredient))
    }
    dispatch(ingredientDecCounterAction(ingredient['_id']))
  }
}

export const sortingIngredients = (dragIndex: number, hoverIndex: number): ThunkAction<void, RootState, unknown, Action<string>>  => {
  return function(dispatch) {
    dispatch(changeOrderAction(dragIndex, hoverIndex))
    dispatch(sortAction({sortingFunction: bubleSort}))
  }
}