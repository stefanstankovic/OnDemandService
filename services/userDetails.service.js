import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
import {set} from 'lodash';

export const userDetailsService = {
  getByUserId,
  update,
};

function getByUserId(userId, token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/userdetails/` + userId, requestOptions).then(
    handleResponse,
  );
}

function update(userDetails, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(userDetails),
  };

  return fetch(
    `${API_BASE}/userdetails/` + userDetails.id,
    requestOptions,
  ).then(handleResponse);
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
