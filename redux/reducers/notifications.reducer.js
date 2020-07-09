import * as types from '../actions/actionTypes';

export function notification(
  state = {
    notifications: [],
    isLoading: false,
    notification: undefined,
    additionalInfo: undefined,
  },
  action,
) {
  switch (action.type) {
    case types.NOTIFICATIONS_REQUEST:
      return {...state, isLoading: true};
    case types.NOTIFICATIONS_SUCCESS:
      return {...state, isLoading: false, notifications: action.notifications};
    case types.NOTIFICATIONS_FAILURE:
      return {...state, isLoading: false};
    case types.NOTIFICATION_DETAILS_REQUEST:
      return {...state, isLoading: true};
    case types.NOTIFICATION_DETAILS_SUCCESS:
      console.log(JSON.stringify(action));
      return {
        ...state,
        isLoading: false,
        notification: action.notification,
        additionalInfo: action.additionalInfo,
      };
    case types.NOTIFICATION_DETAILS_FAILURE:
      return {...state, isLoading: false};
    case types.NOTIFICATION_DETAILS_CLOSED:
      return {
        ...state,
        isLoading: false,
        notification: undefined,
        additionalInfo: undefined,
      };
    default:
      return state;
  }
}
