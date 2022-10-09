import axios from "axios";
import store from "../../../store";

const getBaseUrl = (env) => {
  return env === "development"
    ? "http://34.64.88.206:8080/"
    : "prod api url"
};
const _api = axios.create({
  baseURL: getBaseUrl(process.env.NODE_ENV),
  timeout: 1000
});

const patchToken = (method, ...params) => {
  return _api[method](...params, { headers: { "AUTH-TOKEN": store.getState().account.accessToken } });
}

const api = {
  post: (...params) => patchToken("post", ...params),
  get: (...params) => patchToken("get", ...params),
}

const makePath = (path) => `api/${path}`;
const path = {
  user: {
    default: makePath("user"),
    login: makePath("user/login"),
  },
};

export { api, path };