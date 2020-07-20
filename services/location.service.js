import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
import {set, isNull} from 'lodash';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

//import Geolocation from '@react-native-community/geolocation';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

import AsyncStorage from '@react-native-community/async-storage';
import {ASYNC_STORE_KEYS, USER_ROLE} from '../components/common/constants';

const LOCATION_TASK_NAME = 'background-location-task';

export const locationService = {
  addNewLocation,
  getAllWorkers,
  getWorkerDetails,
  getPermissions,
  startWatchLocation,
  clearWatchLocation,
};

function addNewLocation(workerId, latitude, longitude, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      workerId: workerId,
      latitude: latitude,
      longitude: longitude,
    }),
  };

  return fetch(`${API_BASE}/location/`, requestOptions).then(handleResponse);
}

function getAllWorkers(token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/location/`, requestOptions).then(handleResponse);
}

function getWorkerDetails(workerId, token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/location/${workerId}`, requestOptions).then(
    handleResponse,
  );
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

async function getPermissions() {
  const response = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(
    {
      interval: 10000,
      fastInterval: 5000,
    },
  );

  return response === 'already-enabled' || response === 'enabled';
}

async function startWatchLocation() {
  const userString = await AsyncStorage.getItem(ASYNC_STORE_KEYS.USER);
  const authToken = await AsyncStorage.getItem(ASYNC_STORE_KEYS.AUTH_TOKEN);

  if (isNull(authToken) || isNull(userString)) {
    return;
  }

  const user = JSON.parse(userString);

  if (user.role !== USER_ROLE.WORKER) {
    return;
  }

  if (!(await getPermissions())) {
    return;
  }
  /*
  const watchID = Geolocation.watchPosition(
    async ({coords}) => {
      const {latitude, longitude} = coords;
      try {
        await addNewLocation(user.id, latitude, longitude, authToken);
      } catch (ex) {
        console.log(ex);
      }
    },
    error => console.log(JSON.stringify(error)),
    {
      distanceFilter: 100,
      enableHighAccuracy: true,
    },
  );

  await AsyncStorage.setItem(
    ASYNC_STORE_KEYS.GEOLOCATION_WATCH_ID,
    watchID.toString(),
  );
  */

  if (TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
    return;
  }
  TaskManager.defineTask(LOCATION_TASK_NAME, async ({data, error}) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      const {locations} = data;
      const {latitude, longitude} = locations[0].coords;
      try {
        await addNewLocation(user.id, latitude, longitude, authToken);
      } catch (ex) {
        console.error(ex);
      }
    }
  });

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 50000,
    distanceInterval: 300,
    showsBackgroundLocationIndicator: true,
  });
}

async function clearWatchLocation() {
  /*
  const watchID = await AsyncStorage.getItem(
    ASYNC_STORE_KEYS.GEOLOCATION_WATCH_ID,
  );
  Geolocation.clearWatch(watchID);
  */

  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
}
