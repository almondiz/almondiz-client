import { api, path } from "./config";


/** GET /api/post/{postId} */
export const getPostByPostId = postId => {
  return api.get(path.post.one(postId));
};

/** GET /api/posts */
export const getAllPosts = () => {
  return api.get(path.post.all);
};

/** GET /api/user/posts */
export const getAllPostsByUserId = userId => {
  const body = { userId };
  return api.post(path.post.byUser, body);
};


export const createPost = body => api.post(path.post.default, body);