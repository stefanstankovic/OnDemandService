import * as types from '../actions/actionTypes';

export function rank(state = {ranks: {}, isLoading: false}, action) {
  switch (action.type) {
    case types.RANK_REQUEST:
      return {...state, isLoading: true};
    case types.RANK_SUCCESS:
      return {...state, isLoading: false, ranks: action.ranks};
    case types.RANK_FAILURE:
      return {...state, isLoading: false};
  }
}
