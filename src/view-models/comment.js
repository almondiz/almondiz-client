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
    const res = await this.model.createComment(postId, body);
    console.log("[CommentViewModel.createComment]", res);
    const { success } = res;
    return success;
  }
  // GET /api/post/{postId}/comments
  async readAllComments(postId, { postAuthorId }) {
    const res = await this.model.readAllComments(postId);
    console.log("[CommentViewModel.readAllComments]", res);
    const { dataList } = res;
    return dataList.map(data => this._makeCommentItemData(data, { postAuthorId }));
  }
  _makeCommentItemData(data, { postAuthorId }) {
    const commentId = data.commentId;

    const commentAuthor = data.user;
    const commentAuthorId = commentAuthor.userId;
  
    return {
      commentId,

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
      goToCommentAuthorPage: navigate => navigate(`/profile/${commentAuthorId}`),

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
        const res = await action(commentId);
        console.log("[CommentViewModel.like]", action, res);
        const { success } = res;
        return success;
      },
      reply: async (text) => {
        if ((text = filterText(text)) === "")   return false;
        
        const body = { text, };
        const res = await this.model.reply(commentId, body);
        console.log("[CommentViewModel.reply]", res);
        const { success } = res;
        return success;
      },

      delete: async () => {
        const res = await this.model.deleteComment(commentId);
        console.log("[CommentViewModel.delete]", res);
        const { success } = res;
        return success;
      },
    }
  }
};