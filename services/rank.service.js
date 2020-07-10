import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
import {set} from 'lodash';

export const rankService = {
  ranksForWorker,
  addRank,
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

function addRank(userId, stars, comment, notificationId, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      userId: userId,
      stars: stars,
      comment: comment,
      notificationId: notificationId,
    }),
  };

  return fetch(`${API_BASE}/rank/`, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
