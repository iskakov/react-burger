import { FeedObject } from '../../utils/constants-test';
import { clearFeedAction, selectFeedAction } from '../actions/feed';
import { feedReducer } from './feed';

const initialState = {
  feed: null
};

describe('burger-ingredient reducer', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('check result action clear feed', () => {
    expect(feedReducer({
      ...initialState, feed: FeedObject
    }, clearFeedAction())).toEqual(
      initialState
    )
  })

  it('check result action select feed', () => {
    expect(feedReducer(initialState, selectFeedAction(FeedObject))).toEqual(
      {
        ...initialState,
        feed: FeedObject
      }
    )
  })
})