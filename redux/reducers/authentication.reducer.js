import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function authentication(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {...state};
    case types.LOGIN_SUCCESS:
      return {...state, loggedIn: true, user: action.user};
    case types.LOGIN_FAILURE:
      return {...state, loggedIn: true};
    case types.LOGOUT:
      return {...state, loggedIn: false, user: undefined};
    default:
      return state;
  }
}
