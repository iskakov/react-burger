import { OrderObject } from '../../utils/constants-test';
import { orderErrorAction, orderLoadAction, orderPreloadAction } from '../actions/order';
import { orderReducer } from './order';

const initialState = {
  order: null,
  orderPreload: false,
  orderError: false,
  errorMessage: '' 
}

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('check result action order preload', () => {
    expect(orderReducer(undefined, orderPreloadAction())).toEqual(
      {
        ...initialState,
        orderPreload: true
      }
    )
  })

  it('check result action error', () => {
    expect(orderReducer(undefined, orderErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        orderError: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action order load', () => {
    expect(orderReducer(initialState, orderLoadAction(OrderObject))).toEqual(
      {
        ...initialState,
        order: OrderObject
      }
    )
  })

})