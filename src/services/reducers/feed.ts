import { IFeedApi } from "../../utils/constants";
import { TFeedActions } from "../actions/feed";
import { CLEAR_FEED, SELECT_FEED } from "../constants/feed";

interface IFeedStateType {
  feed: IFeedApi;
}
export const initialState: IFeedStateType = {
  feed: null
}

export const feedReducer = (state: IFeedStateType = initialState, action: TFeedActions):  IFeedStateType => {
  switch(action.type) {
    case SELECT_FEED: 
      return {...state, feed: action.payload}
    case CLEAR_FEED: 
      return {...state, feed: null}
    default: 
      return state;
  }
}