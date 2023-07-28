
import { IFeedApi } from "../../utils/constants";
import { TFeedsActions } from "../actions/feeds";
import { FEEDS_ON_CLOSE, FEEDS_ON_ERROR, FEEDS_ON_MESSAGE, FEEDS_ON_OPEN } from "../constants/feeds";

interface IFeedStateType {
  feeds: Array<IFeedApi>;
  total: number;
  totalToday: number;
  isOpen: boolean;
  error: boolean;
  errorMessage: string;
}
export const initialState: IFeedStateType = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isOpen: false,
  error: false,
  errorMessage: ''
}

export const feedsReducer = (state: IFeedStateType = initialState, action: TFeedsActions):  IFeedStateType => {
  switch(action.type) {
    case FEEDS_ON_OPEN: 
      return {...state, isOpen: true}
    case FEEDS_ON_CLOSE: 
      return {...state, isOpen: false}
    case FEEDS_ON_ERROR: 
      return {...state, error: true, errorMessage: action.payload}
    case FEEDS_ON_MESSAGE: 
      return {...state, feeds: action.payload.orders, total: action.payload.total, totalToday: action.payload.totalToday}
    default: 
      return state;
  }
}