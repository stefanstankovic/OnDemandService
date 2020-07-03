import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';

export const notificationService = {
  allNotifications,
  updateNotification,
};

function allNotifications(token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/notification`, requestOptions).then(handleResponse);
}

function updateNotification(notificationId, token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(
    `${API_BASE}/notification/${notificationId}`,
    requestOptions,
  ).then(handleResponse);
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
