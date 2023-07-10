import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TApplicationActions, TWSAppActionTypes, TWSAppActions, TWSFeedAndOrdersResponce } from '../store';
import { getCookie } from '../../utils/cookie'

export const socketMiddleware = (wsUrl: string, wsActions: TWSAppActions, wsActionTypes: TWSAppActionTypes, isSecure?: boolean): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let socketIsOpen: boolean = false;
    return next => (action: TApplicationActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const {onOpen, onClose, onError, onMessage} = wsActions;
      const {wsInitType, wsClose} = wsActionTypes;
      let user = null;
      if (isSecure) {
        user = getState().user.user;
      }
      if (type === wsInitType && !socketIsOpen) {
        socket = new WebSocket(`${wsUrl + (user ? `?token=${getCookie('accessToken').split(' ')[1]}` : '')}`);
        socketIsOpen = true;
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = event => {
          dispatch(onError(''));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: TWSFeedAndOrdersResponce = JSON.parse(data);

          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          if (!socketIsOpen) {
            dispatch(onClose());
          }
        };
        if (type === wsClose) {
          socketIsOpen = false;
          socket.close();
        }
      }


      next(action);
    };
  }) as Middleware;
};