import * as types from '../actions/actionTypes';

export function notification(
  state = {
    notifications: [],
    isLoading: false,
    notification: undefined,
    additionalInfo: undefined,
    newNotification: undefined,
  },
  action,
) {
  switch (action.type) {
    case types.NOTIFICATIONS_REQUEST:
      return {...state, isLoading: true};
    case types.NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: action.notifications,
      };
    case types.NOTIFICATIONS_FAILURE:
      return {...state, isLoading: false};
    case types.NOTIFICATION_DETAILS_REQUEST:
      return {...state, isLoading: true};
    case types.NOTIFICATION_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notification: action.notification,
        additionalInfo: action.additionalInfo,
      };
    case types.NOTIFICATION_DETAILS_FAILURE:
      return {...state, isLssoading: false};
    case types.NOTIFICATION_DETAILS_CLOSED:
      return {
        ...state,
        isLoading: false,
        notification: undefined,
        additionalInfo: undefined,
      };
    case types.NEW_NOTIFICATION:
      return {...state, newNotification: action.notification};
    case types.NOTIFICATION_DELIVERED_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.NOTIFICATION_DELIVERED_SUCCESS:
      return {...state, isLoading: false, newNotification: undefined};
    case types.NOTIFICATION_DELIVERED_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
