import { getTime } from "../util";


export default class CommentViewModel {
  constructor(model) {
    this.model = model;
  }


  /** 5-0. COMMENT API */
  // POST /api/post/{postId}/comment
  async createComment(postId, text) {
    if ((text = text.trim()) === "")  return false;

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
      
      isLiked: data.like,
      commentLikedCount: data.likedCount,
  
      replyComments: (() => {
        if (data.reply)
          return data.reply.map(replyComment => this._makeCommentItemData(replyComment, { postAuthorId }));
        else
          return null;
      })(),


      delete: async () => {
        const success = await this.model.delete(commentId);
        console.log("[CommentViewModel.delete]", success);
        return success;
      },

      like: async (b) => {
        const action = this.model[b ? "unlike" : "like"].bind(this.model);
        const success = await action(commentId);
        console.log("[CommentViewModel.like]", action, success);
        return success;
      },
      reply: async (text) => {
        if ((text = text.trim()) === "")  return false;
        
        const body = { text, };
        const { success } = await this.model.reply(commentId, body);
        console.log("[CommentViewModel.reply]", success);
        return success;
      },
    }
  }
};