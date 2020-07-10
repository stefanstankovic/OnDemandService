import * as types from './actionTypes';
import {rankService} from '../../services/rank.service';
import {alertActions} from './alert.actions';

export const rankActions = {
  ranksForWorker,
  addRank,
};

export function ranksForWorker(workerId, token) {
  return dispatch => {
    dispatch(request());

    rankService.ranksForWorker(workerId, token).then(
      response => {
        if (!response.success) {
          dispatch(response.message);
          dispatch(alertActions.error(response.message));
          return;
        }
        dispatch(success(response.ranks));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request() {
    return {type: types.ALL_RANKS_REQUEST};
  }
  function success(ranks) {
    return {type: types.ALL_RANKS_SUCCESS, ranks};
  }
  function failure(error) {
    return {type: types.ALL_RANKS_FAILURE, error};
  }
}

export function addRank(userId, stars, comment, notificationId, token) {
  return dispatch => {
    dispatch(request());

    rankService.addRank(userId, stars, comment, notificationId, token).then(
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
    return {type: types.RANK_REQUEST};
  }
  function success() {
    return {type: types.RANK_SUCCESS};
  }
  function failure(error) {
    return {type: types.RANK_FAILURE, error};
  }
}
