import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getDistance, getTime } from "../util";
import { UserModel } from "../models";


export default class PostViewModel {
  constructor(model) { this.model = model; }

  getData(id) {
    const res = this.model.getData(id);
    return this._makePostItemData(res);
  }
  getDummyData(...params) {
    const resList = this.model.getDummyData(...params);
    return resList.map(res => this._makePostItemData(res));
  }


  getAllDataByUser(userId) {
    const userModel = new UserModel();
    const user = userModel.getData(userId);
    return user.posts.map(postId => this.getData(postId));
  }


  _makePostItemData(post) {
    const navigate = useNavigate();
    const location = useSelector(state => state.global.location);
  
    const postModel = this.model;
    const postId = post.id;
  
    const userModel = new UserModel();
    const myUserId = userModel.getMyUserId();
    const postAuthorId = post.userId;
    const postAuthor = userModel.getData(postAuthorId);
  
    const bestComment = post.comments[post.bestCommentIndex];
    const bestCommentAuthorId = bestComment.userId;
    const bestCommentAuthor = userModel.getData(bestCommentAuthorId);
    
  
    return {
      postId: postId,

      shopThumbUrl: post.shop.thumb,
      shopName: post.shop.name,
      shopAddress: post.shop.location.address,
      shopDistance: `${getDistance(location, post.shop.location)}km`,
      goToShopPage: () => (window.location.href = post.shop.link),

      postTags: post.tags,
      postText: post.content.text,
      postImageUrls: post.content.images,
      goToPostPage: () => navigate(`/post`),
  
      postAuthorEmoji: postAuthor.profile.thumb.emoji,
      postAuthorName: (() => {
        if (postAuthorId === myUserId)
          return "나";
        else
          return userModel.getAlias(postAuthorId);
      })(),
      postAuthorType: (() => {
        if (postAuthorId === myUserId)
          return "me";
        else if (userModel.isSubscribing(postAuthorId))
          return "following";
        else
          return "other";
      })(),
      goToPostAuthorPage: () => {
        console.log(1);
        navigate(`/profile/${postAuthorId}`)
      },

      postCreatedAt: getTime(post.createdAt),
      
      scrap: (() => {
        return (post.scrapped.indexOf(myUserId) >= 0) ? true : false;
      }),
      scrappedCount: post.scrapped.length,
  
      commentCount: postModel.getCommentCount(postId),
      bestCommentText: bestComment.content,
      bestCommentAuthorEmoji: bestCommentAuthor.profile.thumb.emoji,


      // used only in post detail page
      comments: post.comments.map(comment => this._makeCommentItemData(comment, { postAuthorId })),
      //
    };
  }
  _makeCommentItemData(comment, { postAuthorId }) {
    const navigate = useNavigate();

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
      goToCommentAuthorPage: () => navigate(`/profile/${commentAuthorId}`),

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