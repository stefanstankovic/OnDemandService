import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
import {set} from 'lodash';

export const workerService = {
  getAll,
  hireWorker,
  hireResponse,
  confirmJob,
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

function hireResponse(hireRequestId, accepted, message, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      hireRequestId: hireRequestId,
      accepted: accepted,
      responseMessage: message,
    }),
  };

  return fetch(`${API_BASE}/worker/response/`, requestOptions).then(
    handleResponse,
  );
}

function confirmJob(hireRequestId, workerId, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      hireRequestId: hireRequestId,
      workerId: workerId,
    }),
  };

  return fetch(`${API_BASE}/worker/confirm/`, requestOptions).then(
    handleResponse,
  );
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
