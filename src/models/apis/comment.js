import { api, path } from "./config";


/** 5-0. COMMENT API */
// DELETE /api/comment/{commentId}
export const deleteComment = commentId => {
  return api.delete(path.comment.one(commentId));
};
// PATCH /api/comment/{commentId} : unused
/*export const updateComment = (commentId, body) => {
  return api.patch(path.comment.update(commentId), body);
};*/
// POST /api/post/{postId}/comment
export const createComment = (postId, body) => {
  return api.post(path.comment.create(postId), body);
};
// GET /api/post/{postId}/comments
export const readAllComments = postId => {
  return api.get(path.comment.byPost(postId));
};


/** 5-1. COMMENT LIKE API */
// POST /api/comment/{commentId}/like
export const like = commentId => {
  return api.post(path.comment.like(commentId), {});
};
// DELETE /api/comment/{commentId}/like
export const unlike = commentId => {
  return api.delete(path.comment.like(commentId));
};


/** 6-0. REPLY API */
// POST /api/comment/{commentId}/reply
export const reply = (commentId, body) => {
  return api.post(path.comment.reply(commentId), body);
};