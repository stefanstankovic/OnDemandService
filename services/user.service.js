import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';
import {set} from 'lodash';
import SocketService from './socket.service';
import AsyncStorage from '@react-native-community/async-storage';
import {ASYNC_STORE_KEYS} from '../components/common/constants';
export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, password: password}),
  };

  return fetch(`${API_BASE}/user/login`, requestOptions)
    .then(handleResponse)
    .then(response => {
      if (!response.success) {
        return Promise.reject(response.message);
      }

      return response;
    });
}

async function logout(token) {
  // remove user from local storage to log user out
  //localStorage.removeItem('user');

  await AsyncStorage.removeItem(ASYNC_STORE_KEYS.USER);
  await AsyncStorage.removeItem(ASYNC_STORE_KEYS.AUTH_TOKEN);
  const deviceId = await AsyncStorage.getItem(ASYNC_STORE_KEYS.DEVICE_TOKEN);
  await AsyncStorage.removeItem(ASYNC_STORE_KEYS.DEVICE_TOKEN);
  await AsyncStorage.clear();

  SocketService.getInstance().disconnetFromSocket();

  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({deviceId: deviceId}),
  };

  return fetch(`${API_BASE}/user/logout`, requestOptions)
    .then(handleResponse)
    .then(response => {
      if (!response.success) {
        return Promise.reject(response.message);
      }

      return Promise.resolve(response);
    });
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API_BASE}/user/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API_BASE}/user/` + id, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };

  return fetch(`${API_BASE}/user/signup`, requestOptions)
    .then(handleResponse)
    .then(response => {
      if (!response.success) {
        return Promise.reject(response.message);
      }

      return response;
    });
}

function update(user, token) {
  let headers = authHeader(token);
  set(headers, 'Content-Type', 'application/json');
  const requestOptions = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(user),
  };

  return fetch(`${API_BASE}/user/` + user.id, requestOptions).then(
    handleResponse,
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${API_BASE}/user/` + id, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
