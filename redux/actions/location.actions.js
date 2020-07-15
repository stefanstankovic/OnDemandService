import * as types from './actionTypes';

export const locationActions = {
  locationChanged,
  subscribeOnLocationChanged,
};

function locationChanged(workerId, location, token) {
  return {type: types.LOCATION_CHANGES};
}

function subscribeOnLocationChanged(userId, token) {}
