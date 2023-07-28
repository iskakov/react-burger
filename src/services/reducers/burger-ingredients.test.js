import { BurgerObject } from '../../utils/constants-test';

import { ingredientDecCounterAction, ingredientIncCounterAction, ingredientsErrorAction, ingredientsLoadAction, ingredientsPreloadAction } from '../actions/burger-ingredients';
import { burgerIngredientsReducer, initialState } from './burger-ingredients';

describe('burger-ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(
      {...initialState,}
    )
  })

  it('check result action ingredients preload', () => {
    expect(burgerIngredientsReducer(undefined, ingredientsPreloadAction())).toEqual(
      {
        ...initialState,
        ingredientsPreload: true
      }
    )
  })

  it('check result action error', () => {
    expect(burgerIngredientsReducer(undefined, ingredientsErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        ingredientsError: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action ingredients load', () => {
    expect(burgerIngredientsReducer({...initialState}, ingredientsLoadAction([BurgerObject]))).toEqual(
      {
        ...initialState,
        ingredients: [BurgerObject]
      }
    )
  })

  it('check result action inc counter', () => {
    expect(burgerIngredientsReducer({
      ...initialState, ingredients: [{...BurgerObject}]
    }, ingredientIncCounterAction('643d69a5c3f7b9001cfa093c'))).toEqual(
      {...initialState, ingredients: [{...BurgerObject, count: 1}]}
    )
  })

  it('check result action dec counter', () => {
    expect(burgerIngredientsReducer({
      ...initialState, ingredients: [{...BurgerObject, count: 1}]
    }, ingredientDecCounterAction('643d69a5c3f7b9001cfa093c'))).toEqual(
      {...initialState, ingredients: [BurgerObject]}
    )
  })
})