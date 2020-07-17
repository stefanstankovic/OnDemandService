import * as types from '../actions/actionTypes';

export function location(
  state = {isLoading: false, workers: [], error: undefined},
  action,
) {
  switch (action.type) {
    case types.LOCATION_CHANGES:
      return {
        ...state,
        location: {
          longitude: state.longitude,
          latitude: state.latitude,
        },
      };
    case types.ALL_WORKERS_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.ALL_WORKERS_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workers: action.workers,
      };
    case types.ALL_WORKERS_LOCATION_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    case types.LOCATION_CHANGED:
      return {
        ...state,
        workers: state.workers.map(worker =>
          worker.worker.workerId === action.newLocation.workerId
            ? {
                ...worker,
                location: [
                  ...worker.location,
                  {
                    latitude: action.newLocation.latitude,
                    longitude: action.newLocation.longitude,
                  },
                ],
              }
            : worker,
        ),
      };
    default:
      return {...state};
  }
}
