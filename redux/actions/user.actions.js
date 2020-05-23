import * as types from './actionTypes';
import {userService} from '../../services/user.service';
import {alertActions} from './alert.actions';
import {history} from '../../helpers/history';

export const userActions = {
  login,
  logout,
  register,
  getAll,
};

export function login(username, password) {
  return dispatch => {
    dispatch(request({username}));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request(user) {
    return {type: types.LOGIN_REQUEST, user};
  }
  function success(user) {
    return {type: types.LOGIN_SUCCESS, user};
  }
  function failure(error) {
    return {type: types.LOGIN_FAILURE, error};
  }
}

export function logout() {
  userService.logout();
  return {type: types.LOGOUT};
}

export function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request(user) {
    return {type: types.REGISTER_REQUEST, user};
  }
  function success(user) {
    return {type: types.REGISTER_SUCCESS, user};
  }
  function failure(error) {
    return {type: types.REGISTER_FAILURE, error};
  }
}

export function getAll() {
  return dispatch => {
    dispatch(request());

    userService
      .getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error)),
      );
  };

  function request() {
    return {type: types.GETALL_REQUEST};
  }
  function success(users) {
    return {type: types.GETALL_SUCCESS, users};
  }
  function failure(error) {
    return {type: types.GETALL_FAILURE, error};
  }
}
