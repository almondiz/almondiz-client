import { api, path } from "./config";

const signup = (body) => {
  return api.post(path.user.default, body);
}

const login = (body) => {
  return api.post(path.user.login, body);
}

export {
  signup,
  login,
}