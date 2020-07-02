import * as types from './actionTypes';
import {rankService} from '../../services/rank.service';
import {alertActions} from './alert.actions';

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
    return {type: types.UPDATE_USER_REQUEST};
  }
  function success(user) {
    return {type: types.UPDATE_USER_SUCCESS, user};
  }
  function failure(error) {
    return {type: types.UPDATE_USER_FAILURE, error};
  }
}
