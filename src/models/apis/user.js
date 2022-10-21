import { api, path } from "./config";


/** 1. USER API */
// GET /api/user
export const whoami = () => {
  return api.get(path.user.default);
};
// POST /api/user
export const signup = body => {
  return api.post(path.user.default, body);
};
// GET /api/user/{userId}
export const get = userId => {
  return api.get(path.user.one(userId));
};
// POST /api/user/login
export const login = body => {
  return api.post(path.user.login, body);
};


/** 2. FOLLOW API */
// GET /api/api/followings
export const getMyAllFollowings = () => {
  return api.get(path.user.followings);
};


/** 3. NOTIFICATION API */
// GET /api/notifications
export const getMyNoticeData = () => {
  return this.get(path.user.notices);
}