import { getDistance, getTime } from "../util";
import { UserModel } from "../models";

import store from "../store";

export default class PostViewModel {
  constructor(model) { this.model = model; }

  getData(id) {
    const res = this.model.getData(id);
    return this._makePostItemData(res);
  }
  getDummyData(...params) {
    const resList = this.model.getDummyData(...params);
    // return resList.map(res => this._makePostItemData(res));
  }
  async getAllPost() {
    const { dataList } = await this.model.getAllPost();
    return dataList.map(res => this._makePostItemData(res));
  }


  getAllDataByUser(userId) {
    const userModel = new UserModel();
    const user = userModel.getData(userId);
    return user.posts.map(postId => this.getData(postId));
  }

  _makePostItemData(post) {
    console.log(1)
    console.log(post)
    console.log(2)
    // const navigate = useNavigate();
    const location = store.getState().global.location;
  
    const postModel = this.model;
    const postId = post.id;
  
    const userModel = new UserModel();
    const myUserId = userModel.getMyUserId();
    const postAuthorId = post.user.userId;
    const postAuthor = userModel.getData(postAuthorId);
    
    const bestComment = post.commentCount && {
      default: post.comments[post.bestCommentIndex],
      authorId: bestComment.userId,
      author: userModel.getData(bestComment.userId)
    }
  
    return {
      postId: postId,

      shopThumbUrl: post.shop.thumb,
      shopName: post.shop.shopName,
      shopAddress: post.shop.location.address.split(" ").slice(0, 3).join(" "),
      shopAddressDetail: post.shop.location.address,
      shopDistance: `${getDistance(location, post.shop.location)}km`,
      goToShopPage: () => (window.location.href = post.shop.link),

      // Tag 수정필요
      postTags: post.tags.map(({ tagName }) => tagName),
      postText: post.text,
      postImageUrls: post.postFileImgUrls,
      goToPostPage: () => this?.navigate(`/post`),
  
      postAuthorEmoji: post.user.thumb.emoji,
      postAuthorName: post.user.nickName,
      // postAuthorName: (() => {
      //   if (postAuthorId === myUserId)
      //     return "나";
      //   else
      //     return userModel.getAlias(postAuthorId);
      // })(),
      postAuthorType: "other",
      // postAuthorType: (() => {
      //   if (postAuthorId === myUserId)
      //     return "me";
      //   else if (userModel.isSubscribing(postAuthorId))
      //     return "following";
      //   else
      //     return "other";
      // })(),
      goToPostAuthorPage: () => this?.navigate(`/profile/${postAuthorId}`),

      // 수정필요
      postCreatedAt: "3분전",//getTime(post.createdAt),
      
      scrap: (() => {
        return (post.scrapped.indexOf(myUserId) >= 0) ? true : false;
      }),
      scrappedCount: post.scrappedCount,
  
      commentCount: post.commentCount,
      bestCommentText: bestComment.default?.content,
      bestCommentAuthorEmoji: bestComment.author?.profile.thumb.emoji,

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
      goToCommentAuthorPage: () => this?.navigate(`/profile/${commentAuthorId}`),

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