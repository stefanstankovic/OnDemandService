import * as types from './actionTypes';
import {notificationService} from '../../services/notifications.service';
import SocketService from '../../services/socket.service';
import {alertActions} from './alert.actions';

export const notificationActions = {
  allNotifications,
  getNotification,
  notificationDetailsClosed,
  subscribeOnNotifications,
  confirmNotificationDelivered,
  cleanNewNotifications,
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

export function getNotification(id, token) {
  return dispatch => {
    dispatch(request());

    notificationService.getNotification(id, token).then(
      response => {
        if (!response.success) {
          dispatch(response.message);
          dispatch(alertActions.error(response.message));
          return;
        }
        dispatch(success(response));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request() {
    return {type: types.NOTIFICATION_DETAILS_REQUEST};
  }
  function success(response) {
    return {
      type: types.NOTIFICATION_DETAILS_SUCCESS,
      notification: response.notification,
      additionalInfo: response.additionalInfo,
    };
  }
  function failure(error) {
    return {type: types.NOTIFICATION_DETAILS_FAILURE, error};
  }
}

export function notificationDetailsClosed() {
  return {type: types.NOTIFICATION_DETAILS_CLOSED};
}

export function subscribeOnNotifications() {
  return dispatch => {
    SocketService.getInstance()
      .getSocket()
      .on('socket.notify.user', (...args) => {
        dispatch({type: types.NEW_NOTIFICATION, notification: args[0]});
      });
  };
}

export function cleanNewNotifications() {
  return {type: types.CLEAN_NEW_NOTIFICATION};
}

export function confirmNotificationDelivered(notificationId, token) {
  return dispatch => {
    dispatch(request());

    notificationService.ackNotification(notificationId, token).then(
      response => {
        if (!response.success) {
          dispatch(response.message);
          dispatch(alertActions.error(response.message));
          return;
        }
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request() {
    return {type: types.NOTIFICATION_DELIVERED_REQUEST};
  }
  function success() {
    return {type: types.NOTIFICATION_DELIVERED_SUCCESS};
  }
  function failure(error) {
    return {type: types.NOTIFICATION_DELIVERED_FAILURE, error};
  }
}
