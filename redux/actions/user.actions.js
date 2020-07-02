import * as types from './actionTypes';
import {userService} from '../../services/user.service';
import {userDetailsService} from '../../services/userDetails.service';
import {alertActions} from './alert.actions';

export const userActions = {
  login,
  logout,
  register,
  getAll,
  getUserDetails,
  updateUserDetails,
  updateUser,
};

export function login(email, password) {
  return dispatch => {
    dispatch(request({email}));

    userService.login(email, password).then(
      user => {
        dispatch(success(user));
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
  function success(response) {
    return {
      type: types.LOGIN_SUCCESS,
      user: response.user,
      token: response.token,
    };
  }
  function failure(error) {
    return {type: types.LOGIN_FAILURE, error};
  }
}

export function logout() {
  //userService.logout();
  return {type: types.LOGOUT};
}

export function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
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

  function request(userRequest) {
    return {type: types.REGISTER_REQUEST, userRequest};
  }
  function success(response) {
    return {
      type: types.REGISTER_SUCCESS,
      user: response.user,
      token: response.token,
    };
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

export function updateUser(user, token) {
  return dispatch => {
    dispatch(request());

    userService.update(user, token).then(
      response => {
        if (!response.success) {
          dispatch(response.message);
          dispatch(alertActions.error(response.message));
          return;
        }
        dispatch(success(response.user));
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

export function getUserDetails(userId, token) {
  return dispatch => {
    dispatch(request());

    userDetailsService.getByUserId(userId, token).then(
      response => {
        if (!response.success) {
          dispatch(response.message);
          dispatch(alertActions.error(response.message));
          return;
        }
        dispatch(success(response.userDetails));
      },
      error => dispatch(failure(error)),
    );

    function request() {
      return {type: types.USER_DETAILS_REQUEST};
    }
    function success(userDetails) {
      return {type: types.USER_DETAILS_SUCCESS, userDetails: userDetails};
    }
    function failure(error) {
      return {type: types.USER_DETAILS_FAILURE, error};
    }
  };
}

export function updateUserDetails(userDetails, token) {
  return dispatch => {
    dispatch(request());

    userDetailsService.update(userDetails, token).then(
      response => {
        if (!response.success) {
          dispatch(response.message);
          dispatch(alertActions.error(response.message));
          return;
        }
        dispatch(success(response.userDetails));
      },
      error => dispatch(failure(error)),
    );
  };
  function request() {
    return {type: types.UPDATE_USER_DETAILS_REQUEST};
  }
  function success(userDetails) {
    return {type: types.UPDATE_USER_DETAILS_SUCCESS, userDetails: userDetails};
  }
  function failure(error) {
    return {type: types.UPDATE_USER_DETAILS_FAILURE, error};
  }
}
