import * as types from './actionTypes';

export const workersActions = {
  allWorkers,
  workerLoggedOut,
  workerLoggedIn,
};

export function allWorkers(workers) {
  return {type: types.ALL_WORKERS, workers: workers};
}

export function workerLoggedOut(worker) {
  return {type: types.WORKER_LOGGED_OUT, worker: worker};
}

export function workerLoggedIn(worker) {
  return {type: types.WORKER_LOGGED_IN, worker: worker};
}
