import * as types from './actionTypes';
import {locationService} from '../../services/location.service';
import {alertActions} from './alert.actions';
import SocketService from '../../services/socket.service';

export const locationActions = {
  allWorkers,
  subscribeOnLocationChange,
};

function allWorkers(token) {
  return dispatch => {
    dispatch(request());

    locationService.getAllWorkers(token).then(
      response => {
        if (!response.success) {
          dispatch(response.message);
          dispatch(alertActions.error(response.message));
          return;
        }
        dispatch(success(response.workers));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request() {
    return {type: types.ALL_WORKERS_LOCATION_REQUEST};
  }
  function success(workers) {
    return {type: types.ALL_WORKERS_LOCATION_SUCCESS, workers};
  }
  function failure(error) {
    return {type: types.ALL_WORKERS_LOCATION_FAILURE, error};
  }
}

function subscribeOnLocationChange() {
  return dispatch => {
    SocketService.getInstance()
      .getSocket()
      .on('location.changed', (...args) => {
        dispatch({type: types.LOCATION_CHANGED, newLocation: args[0]});
      });
  };
}
