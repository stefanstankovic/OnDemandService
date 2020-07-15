import * as types from '../actions/actionTypes';

export function rank(
  state = {ranks: [], isLoading: false, error: undefined},
  action,
) {
  switch (action.type) {
    case types.ALL_RANKS_REQUEST:
      return {...state, isLoading: true, ranks: []};
    case types.ALL_RANKS_SUCCESS:
      return {...state, isLoading: false, ranks: action.ranks};
    case types.ALL_RANKS_FAILURE:
      return {...state, isLoading: false, error: action.error};
    case types.RANK_REQUEST:
      return {...state, isLoading: true};
    case types.RANK_SUCCESS:
      return {...state, isLoading: false};
    case types.RANK_FAILURE:
      return {...state, isLoading: false, error: action.error};
    default:
      return state;
  }
}
