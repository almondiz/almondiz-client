import { getDistance, getTime } from "../util";
import { UserModel } from "../models";



import store from "../store";

export default class PostViewModel {
  constructor(model) {
    this.model = model;
  }


  // [DEPRECATED] -> getPostByPostId(postId)
  getData(id) {
    const res = this.model.getData(id);
    return this._makePostItemData(res);
  }


  /** GET /api/post/{postId} */
  async getPostByPostId(postId) {
    const { data } = await this.model.getPostByPostId(postId);
    console.log("[PostViewModel.getPostByPostId]", data);

    const myLocation = this._getMyLocation();
    return this._makePostItemData(data, { myLocation });
  }

  /** GET /api/posts */
  async getAllPosts() {
    const { dataList } = await this.model.getAllPosts();
    console.log("[PostViewModel.getAllPosts]", dataList);

    const myLocation = this._getMyLocation();
    return dataList.map(res => this._makePostItemData(res, { myLocation }));
  }

  /** GET /api/user/posts */
  async getAllPostsByUserId(userId) {
    const { dataList } = await this.model.getAllPostsByUserId();
    console.log("[PostViewModel.getAllPostsByUserId]", dataList);

    const myLocation = this._getMyLocation();
    return dataList.map(res => this._makePostItemData(res, { myLocation }));
  }


  _getMyLocation() { return store.getState().global.location; }

  _makePostItemData(post, { myLocation }) {
    //const postModel = this.model;
    const postId = post.postId;
  
    const userModel = new UserModel();
    //const myUserId = userModel.getMyUserId();
    const postAuthorId = post.user.userId;
    //const postAuthor = userModel.getData(postAuthorId);
    
    const bestComment = post.commentCount && {          // temp
      default: post.comments[post.bestCommentIndex],
      authorId: bestComment.userId,
      author: userModel.getData(bestComment.userId)
    };
  
    return {
      postId: postId,

      shopThumbUrl: post.shop.thumb,
      shopName: post.shop.shopName,
      shopAddress: post.shop.location.address.split(" ").slice(0, 3).join(" "),   // ### HMM (지번만 필요함. 서버에서 도로명 주지 않도록 해야 할 듯)
      shopAddressDetail: post.shop.location.address,
      shopDistance: `${getDistance(myLocation, post.shop.location)}km`,
      goToShopPage: navigate => (window.location.href = post.shop.link),          // ### Future Works

      postTags: post.tags,
      postText: post.text,
      postImageUrls: post.postFileImgUrls,
      goToPostPage: navigate => navigate(`/post/${postId}`),
  
      postAuthorEmoji: post.user.thumb.emoji,
      postAuthorName: post.user.nickName,                                         // ### HMM ('나'를 판별할 수 있어야 함)
      // postAuthorName: (() => {
      //   if (postAuthorId === myUserId)
      //     return "나";
      //   else
      //     return userModel.getAlias(postAuthorId);
      // })(),
      postAuthorType: "other",                                                    // ### 안 고침
      // postAuthorType: (() => {
      //   if (postAuthorId === myUserId)
      //     return "me";
      //   else if (userModel.isSubscribing(postAuthorId))
      //     return "following";
      //   else
      //     return "other";
      // })(),
      goToPostAuthorPage: navigate => navigate(`/profile/${postAuthorId}`),

      postCreatedAt: "3분 전",//getTime(post.createdAt),                           // ### 안 고침 (유닉스 타임스탬프)
      
      scrap: post.scrap,
      scrappedCount: post.scrappedCount,
  
      commentCount: post.commentCount,
      bestCommentText: bestComment?.default?.content,                             // ### 안 고침
      bestCommentAuthorEmoji: bestComment?.author?.profile.thumb.emoji,           // ### 안 고침

      // used only in post detail page
      comments: post.comments?.map(comment => this._makeCommentItemData(comment, { postAuthorId })),
      //
    };
  }
  _makeCommentItemData(comment, { postAuthorId }) {
    // const navigate = useNavigate();

    const commentId = comment.id;
  
    const userModel = new UserModel();
    const myUserId = userModel.getMyUserId();
    const commentAuthorId = comment.userId;
    const commentAuthor = userModel.getData(commentAuthorId);
  
  
    return {
      commentId: commentId,

      commentAuthorEmoji: commentAuthor.profile.thumb.emoji,
      commentAuthorName: (() => {
        if (commentAuthorId === myUserId)
          return "나";
        else
          return userModel.getAlias(commentAuthorId);
      })(),
      commentAuthorType: (() => {
        if (commentAuthorId === myUserId)
          return "me";
        else if (userModel.isSubscribing(commentAuthorId))
          return "following";
        else
          return "other";
      })(),
      isCommentAuthorPostAuthor: (commentAuthorId === postAuthorId),
      goToCommentAuthorPage: navigate => navigate(`/profile/${commentAuthorId}`),

      commentCreatedAt: getTime(comment.createdAt),
  
      commentText: comment.content,
      
      like: (() => {
        return (comment.liked.indexOf(myUserId) >= 0) ? true : false;
      }),
      commentLikedCount: comment.liked.length,
  
      replyComments: (() => {
        if (comment.reply)
          return comment.reply.map(replyComment => this._makeCommentItemData(replyComment, { postAuthorId }));
        else
          return null;
      })(),
    }
  }
};