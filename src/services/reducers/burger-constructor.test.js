import {burgerConstructorReducer} from './burger-constructor';
import { addBunAction, addIngredientAction, changeDragAction, changeOrderAction, clearIngredientsAction, delBunAction, delIngredientAction, sortAction } from '../actions/burger-constructor';
import { BurgerConstructorObject, BurgerObject } from '../../utils/constants-test';
import { bubleSort } from '../../utils/constants';

describe('burger-constructor reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(
      {
        bun: null,
        ingredients: []
      }
    )
  })

  it('check result action add ingredient', () => {
    expect(burgerConstructorReducer(undefined, addIngredientAction(BurgerObject, 1, '77800c46-f606-49ef-bbd7-2a9789844274'))).toEqual(
      {
        bun: null,
        ingredients: [BurgerConstructorObject]
      }
    )
  })

  it('check result action add bun', () => {
    expect(burgerConstructorReducer(undefined, addBunAction(BurgerConstructorObject))).toEqual(
      {
        bun: BurgerConstructorObject,
        ingredients: []
      }
    )
  })

  it('check result action del bun', () => {
    expect(burgerConstructorReducer({
      bun: BurgerObject,
      ingredients: []
    }, delBunAction())).toEqual(
      {
        bun: null,
        ingredients: []
      }
    )
  })

  it('check result action del ingredient', () => {
    expect(burgerConstructorReducer({
      bun: null,
      ingredients: [BurgerConstructorObject]
    }, delIngredientAction(BurgerConstructorObject))).toEqual(
      {
        bun: null,
        ingredients: []
      }
    )
  })

  it('check result action change order', () => {
    expect(burgerConstructorReducer({
      bun: null,
      ingredients: [BurgerConstructorObject, {...BurgerConstructorObject, order: 2}]
    }, changeOrderAction(1,2))).toEqual(
      {
        bun: null,
        ingredients: [{...BurgerConstructorObject, order: 2}, {...BurgerConstructorObject, order: 1}]
      }
    )
  })

  it('check result action sort', () => {
    expect(burgerConstructorReducer({
      bun: null,
      ingredients: [BurgerConstructorObject, {...BurgerConstructorObject, order: 3}, {...BurgerConstructorObject, order: 2}]
    }, sortAction({sortingFunction: bubleSort}))).toEqual(
      {
        bun: null,
        ingredients: [BurgerConstructorObject, {...BurgerConstructorObject, order: 2}, {...BurgerConstructorObject, order: 3}]
      }
    )
  })

  it('check result action clear ingredients', () => {
    expect(burgerConstructorReducer({
      bun: null,
      ingredients: [BurgerConstructorObject, {...BurgerConstructorObject, order: 3}, {...BurgerConstructorObject, order: 2}]
    }, clearIngredientsAction())).toEqual(
      {
        bun: null,
        ingredients: []
      }
    )
  })

  it('check result action change drag', () => {
    expect(burgerConstructorReducer({
      bun: null,
      ingredients: [BurgerConstructorObject, {...BurgerConstructorObject, isDrag: false, uuid: '23534b56-55c5-4e85-91de-4d80c1aa4d6a'}, {...BurgerConstructorObject, isDrag: false, uuid: '2d4892b5-903a-40d7-b253-be2eecf23f0e'}]
    }, changeDragAction(true, '23534b56-55c5-4e85-91de-4d80c1aa4d6a'))).toEqual(
      {
        bun: null,
        ingredients: [BurgerConstructorObject, {...BurgerConstructorObject, isDrag: true, uuid: '23534b56-55c5-4e85-91de-4d80c1aa4d6a'}, {...BurgerConstructorObject, isDrag: false, uuid: '2d4892b5-903a-40d7-b253-be2eecf23f0e'}]
      }
    )
  })
})