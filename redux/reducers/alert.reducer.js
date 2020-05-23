import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function alert(state = initialState, action) {
  switch (action.type) {
    case types.SUCCESS:
      return {
        ...state,
        type: 'alert-success',
        message: action.message,
      };
    case types.ERROR:
      return {
        ...state,
        type: 'alert-danger',
        message: action.message,
      };
    case types.CLEAR:
      return {...state};
    default:
      return state;
  }
}
