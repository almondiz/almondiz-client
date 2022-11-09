import { api, path } from "./config";


/** 4-0. POST API */
// POST /api/post
export const createPost = body => {
  return api.post(path.post.default, body);
};
// GET /api/post/{postId}
export const readPost = postId => {
  return api.get(path.post.one(postId));
};
// DELETE /api/post/{postId}
export const deletePost = postId => {
  return api.delete(path.post.one(postId));
};
// PATCH /api/post/{postId}
export const modifyPost = (postId, body) => {
  return api.post(path.post.one(postId), body);
};
// GET /api/posts
export const readAllPosts = () => {
  return api.get(path.post.all);
};
// GET /api/user/posts
export const readAllUserPosts = userId => {
  const body = { userId };
  return api.post(path.post.byUser(userId));
};

/** 4-1. POST SCRAP API */
// POST /api/postScrap/post/{postId}/user
export const scrap = postId => {
  return api.post(path.post.scrap(postId), {});
};
// DELETE /api/postScrap/post/{postId}
export const unscrap = postId => {
  return api.delete(path.post.unscrap(postId));
};
// GET /api/postScraps/user
export const readAllScrappedPosts = () => {
  return api.get(path.post.byScrap);
};