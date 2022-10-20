import { api, path } from "./config";


/** 5-0. COMMENT API */
// DELETE /api/comment/{commentId}
export const deleteComment = (commentId) => {
  return api.delete(path.comment.delete(commentId));
};
// PATCH /api/comment/{commentId} : not used
export const updateComment = (commentId, body) => {
  return api.patch(path.comment.update(commentId), body);
};
// POST /api/post/{postId}/comment
export const createComment = (postId, body) => {
  return api.post(path.comment.create(postId), body);
};
// GET /api/post/{postId}/comments
export const readAllComments = (postId) => {
  return api.get(path.comment.read(postId));
};


/** 5-1. COMMENT LIKE API */
// POST /api/comment/{postId}/comments
export const likeComment = (commentId) => {
  return api.post(path.comment.like(commentId), {});
};
// DELETE /api/comment/{postId}/comments
export const unlikeComment = (commentId) => {
  return api.delete(path.comment.unlike(commentId));
};