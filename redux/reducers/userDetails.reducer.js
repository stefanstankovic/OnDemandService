import * as types from '../actions/actionTypes';

export function userDetails(
  state = {updating: false, userDetails: {}},
  action,
) {
  switch (action.type) {
    case types.UPDATE_USER_DETAILS_REQUEST:
      return {...state, updating: true};
    case types.UPDATE_USER_DETAILS_SUCCESS:
      return {...state, updating: false, userDetails: action.userDetails};
    case types.UPDATE_USER_DETAILS_FAILURE:
      return {...state, updating: false};
    case types.USER_DETAILS_REQUEST:
      return {...state, updating: true};
    case types.USER_DETAILS_SUCCESS:
      return {...state, updating: false, userDetails: action.userDetails};
    case types.USER_DETAILS_FAILURE:
      return {...state, updating: false};
    default:
      return {...state};
  }
}
