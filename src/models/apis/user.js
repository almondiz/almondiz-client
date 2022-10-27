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
// PATCH /api/api/follow
export const changeAlias = body => {
  return api.patch(path.follow.changeAlias, body);
};
// GET /api/api/followings
export const getMyAllFollowings = () => {
  return api.get(path.follow.all);
};
// POST /api/follow
export const follow = body => {
  return api.post(path.follow.default, body);
};
// DELETE /api/follow/{followId}
export const unfollow = userId => {
  return api.delete(path.follow.one(userId));
};


/** 3. NOTIFICATION API */
// GET /api/notifications
export const getMyNoticeData = () => {
  return api.get(path.notice.all);
}
// DELETE /api/notifications
export const popNotice = noticeId => {
  return api.delete(path.notice.one(noticeId));
};