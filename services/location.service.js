import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
import {set} from 'lodash';

export const locationService = {
  addNewLocation,
  getAllWorkers,
  getWorkerDetails,
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
