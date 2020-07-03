import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
//import {set} from 'lodash';

export const rankService = {
  ranksForWorker,
};

function ranksForWorker(workerId, token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/rank/${workerId}`, requestOptions).then(
    handleResponse,
  );
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
