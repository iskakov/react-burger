import { FeedObject } from '../../utils/constants-test';
import { feedsOnCloseAction, feedsOnErrorAction, feedsOnMessageAction, feedsOnOpenAction } from '../actions/feeds';
import { feedsReducer } from './feeds';

const initialState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isOpen: false,
  error: false,
  errorMessage: ''
};

describe('feeds reducer', () => {
  it('should return the initial state', () => {
    expect(feedsReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('check result action feeds on open', () => {
    expect(feedsReducer(undefined, feedsOnOpenAction())).toEqual(
      {
        ...initialState,
        isOpen: true
      }
    )
  })

  it('check result action feed on close', () => {
    expect(feedsReducer(undefined, feedsOnCloseAction())).toEqual(
      {
        ...initialState,
        isOpen: false
      }
    )
  })

  it('check result action error', () => {
    expect(feedsReducer(undefined, feedsOnErrorAction('Ошибка'))).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: 'Ошибка'
      }
    )
  })

  it('check result action ingredient load', () => {
    expect(feedsReducer(initialState, feedsOnMessageAction({orders: [FeedObject], total: 200, totalToday: 5000}))).toEqual(
      {
        ...initialState,
        feeds: [FeedObject],
        total: 200,
        totalToday: 5000
      }
    )
  })

})