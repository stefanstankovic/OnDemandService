export function authHeader(user) {
  //return authorization header with jwt token
  if (user && user.token) {
    return {Authorization: 'Bearer ' + user.token};
  } else {
    return {};
  }
}
