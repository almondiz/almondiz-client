import { CommentModel } from "../models";
import { filterText, getTime } from "../util";


export default class CommentViewModel {
  model;
  constructor(model=(new CommentModel())) { this.model = model; }


  /** 5-0. COMMENT API */
  // POST /api/post/{postId}/comment
  async createComment(postId, text) {
    if ((text = filterText(text)) === "")   return false;

    const body = { text, };
    const { success, ...res } = await this.model.createComment(postId, body);
    if (success) {
      console.log("[CommentViewModel.createComment]", res);
      return success;
    } else {
      console.error("[CommentViewModel.createComment]", res);
      return false;
    }
  }
  // GET /api/post/{postId}/comments
  async readAllComments(postId, { postAuthorId }) {
    const { success, ...res } = await this.model.readAllComments(postId);
    if (success) {
      console.log("[CommentViewModel.readAllComments]", res);
      const { dataList } = res;
      return dataList.map(data => this._makeCommentItemData(data, { postAuthorId }));
    } else {
      console.error("[CommentViewModel.readAllComments]", res);
      return false;
    }
  }
  _makeCommentItemData(data, { postAuthorId }) {
    const commentId = data.commentId;

    const commentAuthor = data.user;
    const commentAuthorId = commentAuthor.userId;
    const commentAuthorRelation = commentAuthor.relation;
  
    return {
      commentId,

      commentAuthorEmoji: commentAuthor.thumb.emoji,
      commentAuthorName: (() => {
        switch (commentAuthorRelation) {
          case "me":
            return "나";
          case "following":
            return commentAuthor.alias;
          case "other":
          default:
            return commentAuthor.nickName;
        }
      })(),
      commentAuthorRelation,
      isCommentAuthorPostAuthor: (commentAuthorId === postAuthorId),
      goToCommentAuthorPage: navigate => navigate(`/user/${commentAuthorId}`),

      commentCreatedAt: data.createdAt,
      //commentCreatedAt: getTime(data.createdAt),
  
      commentText: data.text,
      
      isLiked: data.like,
      commentLikedCount: data.likedCount,
  
      replyComments: (() => {
        if (data.reply)
          return data.reply.map(replyComment => this._makeCommentItemData(replyComment, { postAuthorId }));
        else
          return null;
      })(),


      like: async (b) => {
        const action = this.model[b ? "unlike" : "like"].bind(this.model);
        const { success, ...res } = await action(commentId);
        if (success) {
          console.log("[CommentViewModel.like]", action, res);
          return success;
        } else {
          console.error("[CommentViewModel.like]", action, res);
          return false;
        }
      },
      reply: async (text) => {
        if ((text = filterText(text)) === "")   return false;
        
        const body = { text, };
        const { success, ...res } = await this.model.reply(commentId, body);
        if (success) {
          console.log("[CommentViewModel.reply]", res);
          return success;
        } else {
          console.error("[CommentViewModel.reply]", res);
          return false;
        }
      },

      delete: async () => {
        const { success, ...res } = await this.model.deleteComment(commentId);
        if (success) {
          console.log("[CommentViewModel.delete]", res);
          return success;
        } else {
          console.error("[CommentViewModel.delete]", res);
          return false;
        }
      },
    }
  }
};