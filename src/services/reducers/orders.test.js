import { FeedObject } from '../../utils/constants-test';
import { ordersOnCloseAction, ordersOnErrorAction, ordersOnMessageAction, ordersOnOpenAction } from '../actions/orders';
import { ordersReducer } from './orders';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isOpen: false,
  error: false,
  errorMessage: ''
};

describe('orders reducer', () => {
  it('should return the initial state', () => {
    expect(ordersReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('check result action orders on open', () => {
    expect(ordersReducer(undefined, ordersOnOpenAction())).toEqual(
      {
        ...initialState,
        isOpen: true
      }
    )
  })

  it('check result action feed on close', () => {
    expect(ordersReducer(undefined, ordersOnCloseAction())).toEqual(
      {
        ...initialState,
        isOpen: false
      }
    )
  })

  it('check result action error', () => {
    expect(ordersReducer(undefined, ordersOnErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action ingredient load', () => {
    expect(ordersReducer(initialState, ordersOnMessageAction({orders: [FeedObject], total: 200, totalToday: 5000}))).toEqual(
      {
        ...initialState,
        orders: [FeedObject],
        total: 200,
        totalToday: 5000
      }
    )
  })

})