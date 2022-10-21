import { api, path } from "./config";


/** 4-0. POST API */
// POST /api/post
export const createPost = body => {
  return api.post(path.post.default, body);
};
// GET /api/post/{postId}
export const getPostByPostId = postId => {
  return api.get(path.post.one(postId));
};
// GET /api/posts
export const getAllPosts = () => {
  return api.get(path.post.all);
};
// GET /api/user/posts
export const getAllPostsByUserId = userId => {
  const body = { userId };
  return api.post(path.post.byUser, body);
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