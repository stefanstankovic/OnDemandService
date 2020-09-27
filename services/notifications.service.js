import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
import {set} from 'lodash';

export const notificationService = {
  allNotifications,
  updateNotification,
  getNotification,
  ackNotification,
  registerDevice,
  unregisterDevice,
};

function allNotifications(token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/notification`, requestOptions)
    .then(handleResponse)
    .then(response => {
      if (!response.success) {
        return Promise.reject(response.message);
      }
      response.notifications.forEach(notification => {
        const {id, delivered} = notification;

        if (!delivered) {
          ackNotification(id, token);
        }
      });

      return response;
    });
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

function ackNotification(notificationId, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'PUT',
    headers: headers,
  };

  return fetch(
    `${API_BASE}/notification/${notificationId}`,
    requestOptions,
  ).then(handleResponse);
}

function getNotification(id, token) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(token),
  };

  return fetch(`${API_BASE}/notification/${id}`, requestOptions).then(
    handleResponse,
  );
}

function registerDevice(deviceId, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      deviceId: deviceId,
    }),
  };

  return fetch(`${API_BASE}/notification/registerDevice`, requestOptions).then(
    handleResponse,
  );
}

function unregisterDevice(deviceId, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      deviceId: deviceId,
    }),
  };

  return fetch(
    `${API_BASE}/notification/unregisterDevice`,
    requestOptions,
  ).then(handleResponse);
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
