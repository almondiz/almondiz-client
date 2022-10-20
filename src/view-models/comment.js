import { getDistance, getTime } from "../util";
import { UserModel } from "../models";

import store from "../store";


export default class CommentViewModel {
  constructor(model) {
    this.model = model;
  }


  /** 5-0. COMMENT API */
  // POST /api/post/{postId}/comment
  async createComment(postId, text) {
    const body = { text, };
    const { success } = await this.model.createComment(postId, body);
    console.log("[CommentViewModel.createComment]", success);
    return success;
  }
  // GET /api/post/{postId}/comments
  async readAllComments(postId, { postAuthorId }) {
    const { dataList } = await this.model.readAllComments(postId);
    console.log("[CommentViewModel.readAllComments]", dataList);

    return dataList.map((data) => this._makeCommentItemData(data, { postAuthorId }));
  }
  _makeCommentItemData(data, { postAuthorId }) {
    const commentId = data.commentId;

    const commentAuthor = data.user;
    const commentAuthorId = commentAuthor.userId;
  
    return {
      commentId: commentId,

      commentAuthorEmoji: commentAuthor.thumb.emoji,
      commentAuthorName: (() => {
        switch (commentAuthor.relation) {
          case "me":
            return "나";
          case "following":
            return commentAuthor.alias;
          case "other":
          default:
            return commentAuthor.nickName;
        }
      })(),
      commentAuthorRelation: commentAuthor.relation,
      isCommentAuthorPostAuthor: (commentAuthorId === postAuthorId),
      goToCommentAuthorPage: (navigate) => navigate(`/profile/${commentAuthorId}`),

      commentCreatedAt: data.createdAt,
      //commentCreatedAt: getTime(data.createdAt),
  
      commentText: data.text,
      
      like: data.like,
      commentLikedCount: data.likedCount,
  
      replyComments: (() => {
        if (data.reply)
          return data.reply.map(replyComment => this._makeCommentItemData(replyComment, { postAuthorId }));
        else
          return null;
      })(),


      deleteComment: async () => {
        console.log(1);
        const success = await this.model.deleteComment(commentId);
        console.log("[CommentViewModel.deleteComment]", success);
        return success;
      },
      likeComment: async () => {
        console.log(2);
        const success = await this.model.likeComment(commentId);
        console.log("[CommentViewModel.likeComment]", success);
        return success;
      },
      unlikeComment: async () => {
        console.log(3);
        const success = await this.model.unlikeComment(commentId);
        console.log("[CommentViewModel.unlikeComment]", success);
        return success;
      },
    }
  }
};