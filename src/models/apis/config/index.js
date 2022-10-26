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
  //put: (...params) => patchToken("put", ...params),
};

const makePath = (path) => `api/${path}`;
const path = {
  user: {
    /** 1. USER API */
    default: makePath(`user`),
    one: userId => makePath(`user/${userId}`),
    login: makePath(`user/login`),
  },

  /** 2. FOLLOW API */
  follow: {
    default: makePath(`follow`),          // ####
    all: makePath(`api/followings`),
    one: userId => makePath(`follow/${userId}`),
    modifyAlias: makePath(`api/follow`),  // ####
  },

  /** 3. NOTIFICATION API */
  notice: {
    all: makePath(`notifications`),
    one: noticeId => makePath(`post/${noticeId}`),
  },
  
  /** 4. POST API */
  post: {
    default: makePath(`post`),
    one: postId => makePath(`post/${postId}`),

    all: makePath(`posts`),

    byScrap: makePath(`postScraps/user`),
    byUser: userId => makePath(`user/${userId}/posts`),
    byShop: shopId => makePath(`store/${shopId}/posts`),

    scrap: postId => makePath(`postScrap/post/${postId}/user`),
    unscrap: postId => makePath(`postScrap/post/${postId}`),
  },

  /** 5. COMMENT API */
  comment: {
    one: commentId => makePath(`comment/${commentId}`),
    create: postId => makePath(`post/${postId}/comment`),
    byPost: postId => makePath(`post/${postId}/comments`),

    like: commentId => makePath(`comment/${commentId}/like`),

    reply: commentId => makePath(`comment/${commentId}/reply`),
  },


  /** 0. SEARCH API */
  tag: {
    default: makePath(`tag`),
    search: tagName => makePath(`tag/like/${tagName}`),
  },
};

export { api, path };