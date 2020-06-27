import * as types from '../actions/actionTypes';

export function workers(state = {ladingWorkers: false, workers: []}, action) {
  switch (action.type) {
    case types.ALL_WORKERS_REQUEST:
      return {...state, loadingWorkers: true};
    case types.ALL_WORKERS_FAILURE:
      return {...state, loadingWorkers: false};
    case types.ALL_WORKERS_SUCCESS:
      console.log(JSON.stringify(action));
      return {...state, workers: action.workers};
    default:
      return {...state};
  }
}
