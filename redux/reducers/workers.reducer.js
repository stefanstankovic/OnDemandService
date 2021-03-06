import * as types from '../actions/actionTypes';

export function workers(
  state = {
    isLoading: false,
    error: undefined,
    workerId: undefined,
    workers: [],
  },
  action,
) {
  switch (action.type) {
    case types.ALL_WORKERS_REQUEST:
      return {...state, isLoading: true};
    case types.ALL_WORKERS_FAILURE:
      return {...state, isLoading: false};
    case types.ALL_WORKERS_SUCCESS:
      return {...state, isLoading: false, workers: action.workers};
    case types.HIRE_WORKER_REQUEST:
      return {...state, isLoading: true, error: undefined, workerId: undefined};
    case types.HIRE_WORKER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        workerId: undefined,
      };
    case types.HIRE_WORKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workerId: action.workerId,
      };
    case types.WORKER_RESPONSE_REQUEST:
      return {...state, isLoading: true, error: undefined};
    case types.WORKER_RESPONSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case types.CONFIRM_JOB_SUCCESS:
      return {...state, isLoading: false};
    case types.CONFIRM_JOB_REQUEST:
      return {...state, isLoading: true, error: undefined};
    case types.CONFIRM_JOB_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case types.WORKER_RESPONSE_SUCCESS:
      return {...state, isLoading: false};
    default:
      return {...state};
  }
}
