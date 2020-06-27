import {authHeader} from '../helpers/auth-helper';
import {API_BASE} from '../config';

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

function logout() {
  // remove user from local storage to log user out
  //localStorage.removeItem('user');
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
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(token), 'Content-Type': 'application/json'},
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
