import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function registration(state = initialState, action) {
  switch (action.type) {
    case types.LOCATION_CHANGES: {
      return {
        ...state,
        location: {
          longitude: state.longitude,
          latitude: state.latitude,
        },
      };
    }
    default: {
      return {...state};
    }
  }
}
