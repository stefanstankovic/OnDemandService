import * as types from './actionTypes';

export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return {type: types.ALERT_SUCCESS, message};
}

function error(message) {
  return {type: types.ALERT_ERROR, message};
}

function clear() {
  return {type: types.ALERT_CLEAR};
}
