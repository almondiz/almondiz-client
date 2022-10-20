import DefaultModel from "./default-model";


export default class CommentModel extends DefaultModel {
  /** 5-0. COMMENT API */
  // DELETE /api/comment/{commentId}
  deleteComment(commentId) {
    return this.callApi(() => this.api.deleteComment(commentId));
  }
  // POST /api/post/{postId}/comment
  createComment(postId, body) {
    return this.callApi(() => this.api.createComment(postId, body));
  }
  // GET /api/post/{postId}/comments
  readAllComments(postId) {
    return this.callApi(() => this.api.readAllComments(postId));
  }


  /** 5-1. COMMENT LIKE API */
  // POST /api/comment/{postId}/like
  like(commentId) {
    return this.callApi(() => this.api.like(commentId));
  }
  // DELETE /api/comment/{postId}/like
  unlike(commentId) {
    return this.callApi(() => this.api.unlike(commentId));
  }


  /** 6-0. REPLY API */
  // POST /api/comment/{commentId}/reply
  reply(commentId, body) {
    return this.callApi(() => this.api.reply(commentId, body));
  }
};