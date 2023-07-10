import { IFeedApi, TAction } from "../../utils/constants";
import { CLEAR_FEED, SELECT_FEED } from "../constants/feed";

export type TSelectFeedAction = TAction<typeof SELECT_FEED, IFeedApi>;
export type TClearFeedAction = TAction<typeof CLEAR_FEED>;


export type TFeedActions = TSelectFeedAction | TClearFeedAction;

export const selectFeedAction = (feed: IFeedApi): TSelectFeedAction => ({type: SELECT_FEED, payload: feed});
export const clearFeedAction = (): TClearFeedAction => ({type: CLEAR_FEED});
