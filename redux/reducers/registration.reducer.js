import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function registration(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
      };
    case types.REGISTER_SUCCESS:
      return {...state, user: action.user, loggedIn: true};
    case types.REGISTER_FAILURE:
      return {...state, loggedIn: true};
    default:
      return state;
  }
}
