import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function user(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER: {
      return {...state, user: action.user, token: action.token, loggedIn: true};
    }
    case types.LOGIN_REQUEST:
      return {...state, isLoading: true};
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
        user: action.user,
        token: action.token,
      };
    case types.LOGIN_FAILURE:
      return {...state, isLoading: false, loggedIn: false};
    case types.UPDATE_USER_REQUEST:
      return {...state, isLoading: true};
    case types.UPDATE_USER_SUCCESS:
      return {...state, isLoading: false, user: action.user};
    case types.UPDATE_USER_FAILURE:
      return {...state, isLoading: false};
    case types.LOGOUT:
      return {...state, loggedIn: false, user: {}, token: '', isLoading: false};
    case types.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: false,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        token: action.token,
        isLoading: false,
      };
    case types.REGISTER_FAILURE:
      return {...state, isLoading: false};
    default:
      return state;
  }
}
