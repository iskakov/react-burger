import { TAction } from "../../utils/constants";
import { FEEDS_ON_CLOSE, FEEDS_ON_ERROR, FEEDS_ON_INIT, FEEDS_ON_MESSAGE, FEEDS_ON_OPEN } from "../constants/feeds";
import { TWSFeedAndOrdersResponce } from "../store";

export type TFeedsOnInitAction = TAction<typeof FEEDS_ON_INIT>;
export type TFeedsOnOpenAction = TAction<typeof FEEDS_ON_OPEN>;
export type TFeedsOnCloseAction = TAction<typeof FEEDS_ON_CLOSE>;
export type TFeedsOnErrorAction = TAction<typeof FEEDS_ON_ERROR, string>;
export type TFeedsOnMessageAction = TAction<typeof FEEDS_ON_MESSAGE, TWSFeedAndOrdersResponce>;

export type TFeedsActions = TFeedsOnOpenAction | TFeedsOnCloseAction | TFeedsOnErrorAction | TFeedsOnMessageAction | TFeedsOnInitAction;

export const feedsOnOpenAction = (): TFeedsOnOpenAction => ({type: FEEDS_ON_OPEN});
export const feedsOnInitAction = (): TFeedsOnInitAction => ({type: FEEDS_ON_INIT});
export const feedsOnCloseAction = (): TFeedsOnCloseAction => ({type: FEEDS_ON_CLOSE});
export const feedsOnErrorAction = (message: string): TFeedsOnErrorAction => ({type: FEEDS_ON_ERROR, payload: message});
export const feedsOnMessageAction = (responce: TWSFeedAndOrdersResponce): TFeedsOnMessageAction => ({type: FEEDS_ON_MESSAGE, payload: responce});

export type TWSFeedsActions = {
  onOpen: typeof feedsOnOpenAction;
  onClose: typeof feedsOnCloseAction;
  onError: typeof feedsOnErrorAction;
  onMessage: typeof feedsOnMessageAction;
}

export type TWSFeedsActionTypes = {
  wsInitType: typeof FEEDS_ON_INIT;
}
