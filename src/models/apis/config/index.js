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
};

const api = {
  get: (...params) => patchToken("get", ...params),
  post: (...params) => patchToken("post", ...params),
  patch: (...params) => patchToken("patch", ...params),
  delete: (...params) => patchToken("delete", ...params),
};

const makePath = (path) => `api/${path}`;
const path = {
  // 1. USER AUTH API
  user: {
    default: makePath(`user`),
    login: makePath(`user/login`),
  },
  // 4-0. POST API
  post: {
    default: makePath(`post`),
    one: (id) => makePath(`post/${id}`),
    byShop: (id) => makePath(`store/${id}/posts`),
    byUser: makePath(`user/posts`),

    all: makePath(`posts`),
  },
  // 5-0. COMMENT API
  comment: {
    delete: (commentId) => makePath(`comment/${commentId}`),
    update: (commentId) => makePath(`comment/${commentId}`),
    create: (postId) => makePath(`post/${postId}/comment`),
    read: (postId) => makePath(`post/${postId}/comments`),

    like: (commentId) => makePath(`comment/${commentId}/like`),
    unlike: (commentId) => makePath(`comment/${commentId}/like`),
  },
};

export { api, path };