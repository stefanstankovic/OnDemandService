import * as types from './actionTypes';

export const locationActions = {
  locationChaged,
};

function locationChaged(location) {
  return {type: types.LOCATION_CHANGES, location};
}
