import axios from "axios";

const getBaseUrl = (env) => {
  return env === "development"
    ? "http://34.64.88.206:8080/"
    : "prod api url"
}

const api = axios.create({
  baseURL: getBaseUrl(process.env.NODE_ENV),
  timeout: 1000
  // headers,
});

const makePath = (path) => `api/${path}`;
const path = {
  user: {
    default: makePath("user"),
    login: makePath("user/login"),
  },
  post: {
    default: makePath("post"),
    list: makePath("posts"),
  }
}

export {
  api,
  path
}