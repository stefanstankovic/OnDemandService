import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
import {set} from 'lodash';

export const workerService = {
  getAll,
  hireWorker,
};

function getAll(token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/worker/`, requestOptions).then(handleResponse);
}

function hireWorker(workerId, message, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      workerId: workerId,
      accepted: false,
      requestMessage: message,
    }),
  };

  return fetch(`${API_BASE}/worker/hire/`, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
