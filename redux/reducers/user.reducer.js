import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {...state, logging: true};
    case types.LOGIN_SUCCESS:
      console.log(JSON.stringify(action));
      return {...state, loggedIn: true, user: action.user, token: action.token};
    case types.LOGIN_FAILURE:
      return {...state, loggedIn: false};
    case types.LOGOUT:
      return {...state, loggedIn: false, user: undefined};
    case types.REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
      };
    case types.REGISTER_SUCCESS:
      console.log(JSON.stringify(action));
      return {
        ...state,
        user: action.user.user,
        loggedIn: true,
        token: action.user.token,
      };
    case types.REGISTER_FAILURE:
      return {...state, loggedIn: true};
    default:
      return state;
  }
}
