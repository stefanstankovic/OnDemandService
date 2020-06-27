import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {...state, logging: true};
    case types.LOGIN_SUCCESS:
      return {...state, loggedIn: true, user: action.user, token: action.token};
    case types.LOGIN_FAILURE:
      return {...state, loggedIn: false};
    case types.UPDATE_USER_REQUEST:
      return {...state, updating: true};
    case types.UPDATE_USER_SUCCESS:
      return {...state, updating: false, user: action.user};
    case types.UPDATE_USER_FAILURE:
      return {...state, updating: false};
    case types.LOGOUT:
      return {...state, loggedIn: false, user: {}, token: ''};
    case types.REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        token: action.token,
      };
    case types.REGISTER_FAILURE:
      return {...state};
    default:
      return state;
  }
}
