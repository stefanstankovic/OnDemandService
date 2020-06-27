import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';

export const workerService = {
  getAll,
};

function getAll(token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/worker/`, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
