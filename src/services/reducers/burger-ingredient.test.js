import { BurgerObject } from '../../utils/constants-test';
import { clearIngredientAction, ingredientErrorAction, ingredientLoadAction, ingredientPreloadAction, selectIngredientAction } from '../actions/burger-ingredient';
import { burgerIngredientReducer } from './burger-ingredient';

const initialState = {
  ingredient: null,
  load: false,
  error: false,
  errorMessage: ''
};

describe('burger-ingredient reducer', () => {
  it('should return the initial state', () => {
    expect(burgerIngredientReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('check result action ingredient preload', () => {
    expect(burgerIngredientReducer(undefined, ingredientPreloadAction())).toEqual(
      {
        ...initialState,
        load: true
      }
    )
  })

  it('check result action error', () => {
    expect(burgerIngredientReducer(undefined, ingredientErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action ingredient load', () => {
    expect(burgerIngredientReducer(initialState, ingredientLoadAction(BurgerObject))).toEqual(
      {
        ...initialState,
        ingredient: BurgerObject
      }
    )
  })

  it('check result action clear ingredient', () => {
    expect(burgerIngredientReducer({
      ...initialState, ingredient: BurgerObject
    }, clearIngredientAction())).toEqual(
      initialState
    )
  })

  it('check result action select ingredient', () => {
    expect(burgerIngredientReducer(initialState, selectIngredientAction(BurgerObject))).toEqual(
      {
        ...initialState,
        ingredient: BurgerObject
      }
    )
  })
})