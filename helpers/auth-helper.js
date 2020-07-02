export function authHeader(token) {
  //return authorization header with jwt token
  if (token) {
    return {'x-access-token': token};
  } else {
    return {};
  }
}
