import * as types from './actionTypes';
import {workerService} from '../../services/worker.service';
import {alertActions} from './alert.actions';

export const workersActions = {
  allWorkers,
  hireWorker,
  workerLoggedOut,
  workerLoggedIn,
};

function allWorkers(token) {
  return dispatch => {
    dispatch(request());

    workerService.getAll(token).then(
      response => {
        if (!response.success) {
          dispatch(failure(response.message));
          dispatch(alertActions.error(response.message));
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
    return {type: types.ALL_WORKERS_REQUEST};
  }
  function success(workers) {
    return {
      type: types.ALL_WORKERS_SUCCESS,
      workers: workers,
    };
  }
  function failure(error) {
    return {type: types.ALL_WORKERS_FAILURE, error};
  }
}

function hireWorker(workerId, message, token) {
  return dispatch => {
    dispatch(request());

    workerService.hireWorker(workerId, message, token).then(
      response => {
        if (!response.success) {
          dispatch(failure(response.message));
          dispatch(alertActions.error(response.message));
        }

        dispatch(success(workerId));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request() {
    return {type: types.HIRE_WORKER_REQUEST};
  }
  function success(workerId) {
    return {
      type: types.HIRE_WORKER_SUCCESS,
      workerId,
    };
  }
  function failure(error) {
    return {type: types.HIRE_WORKER_FAILURE, error};
  }
}

function workerLoggedOut(worker) {
  return {type: types.WORKER_LOGGED_OUT, worker: worker};
}

function workerLoggedIn(worker) {
  return {type: types.WORKER_LOGGED_IN, worker: worker};
}
