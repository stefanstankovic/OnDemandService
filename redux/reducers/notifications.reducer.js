import * as types from '../actions/actionTypes';

export function notification(
  state = {notifications: [], isLoading: false},
  action,
) {
  switch (action.type) {
    case types.NOTIFICATIONS_REQUEST:
      return {...state, isLoading: true};
    case types.NOTIFICATIONS_SUCCESS:
      return {...state, isLoading: false, notifications: action.notifications};
    case types.NOTIFICATIONS_FAILURE:
      return {...state, isLoading: false};
    default:
      return state;
  }
}
