import * as types from './actionTypes';
import {notificationService} from '../../services/notifications.service';
import {alertActions} from './alert.actions';

export const notificationActions = {
  allNotifications,
};

export function allNotifications(token) {
  return dispatch => {
    dispatch(request());

    notificationService.allNotifications(token).then(
      response => {
        if (!response.success) {
          dispatch(response.message);
          dispatch(alertActions.error(response.message));
          return;
        }
        dispatch(success(response.notifications));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request() {
    return {type: types.NOTIFICATIONS_REQUEST};
  }
  function success(notifications) {
    return {type: types.NOTIFICATIONS_SUCCESS, notifications};
  }
  function failure(error) {
    return {type: types.NOTIFICATIONS_FAILURE, error};
  }
}
