import * as types from '../actions/actionTypes';

export function userDetails(
  state = {isLoading: false, userDetails: {}},
  action,
) {
  switch (action.type) {
    case types.UPDATE_USER_DETAILS_REQUEST:
      return {...state, isLoading: true};
    case types.UPDATE_USER_DETAILS_SUCCESS:
      return {...state, isLoading: false, userDetails: action.userDetails};
    case types.UPDATE_USER_DETAILS_FAILURE:
      return {...state, isLoading: false};
    case types.USER_DETAILS_REQUEST:
      return {...state, isLoading: true};
    case types.USER_DETAILS_SUCCESS:
      return {...state, isLoading: false, userDetails: action.userDetails};
    case types.USER_DETAILS_FAILURE:
      return {...state, isLoading: false};
    default:
      return {...state};
  }
}
