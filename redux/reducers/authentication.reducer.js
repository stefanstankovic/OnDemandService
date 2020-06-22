import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function authentication(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {...state};
    case types.LOGIN_SUCCESS:
      console.log(JSON.stringify(action));
      return {...state, loggedIn: true, user: action.user, token: action.token};
    case types.LOGIN_FAILURE:
      return {...state, loggedIn: false};
    case types.LOGOUT:
      return {...state, loggedIn: false, user: undefined};
    default:
      return state;
  }
}
