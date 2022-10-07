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
      postText: post.content.text,
      postImageUrls: post.content.images,
      postCreatedAt: getTime(post.createdAt),
      goToPostPage: () => navigate(`/post`),
  
      shopName: post.shop.name,
      shopThumbUrl: post.shop.thumb,
      shopAddress: post.shop.location.address,
      shopDistance: `${getDistance(location, post.shop.location)}km`,
      goToShopPage: () => (window.location.href = post.shop.link),
  
      postAuthorType: (() => {
        if (postAuthorId === myUserId)
          return "me";
        else if (userModel.isSubscribing(postAuthorId))
          return "following";
        else
          return "other";
      })(),
      postAuthorName: (() => {
        if (postAuthorId === myUserId)
          return "나";
        else
          return userModel.getAlias(postAuthorId);
      })(),
      postAuthorEmoji: postAuthor.profile.thumb.emoji,
      isPostAuthorFollowing: userModel.isSubscribing(postAuthorId),
      goToPostAuthorPage: () => {
        console.log(1);
        navigate(`/profile/${postAuthorId}`)
      },
  
      postTags: post.tags,
  
      scrappedCount: post.scrapped.length,
  
      commentCount: postModel.getCommentCount(postId),
      bestCommentText: bestComment.content,
      bestCommentAuthorEmoji: bestCommentAuthor.profile.thumb.emoji,


      // post detail page에서만 필요한 것
      comments: post.comments.map(comment => this._makeCommentItemData(comment, { postAuthorId })),

      shop: post.shop,  // temp
      //
    };
  }

  _makeCommentItemData(comment, { postAuthorId }) {
    const navigate = useNavigate();
  
  
    const userModel = new UserModel();
    const myUserId = userModel.getMyUserId();
    const commentAuthorId = comment.userId;
    const commentAuthor = userModel.getData(commentAuthorId);
  
  
    return {
      commentCreatedAt: getTime(comment.createdAt),
  
      commentAuthorType: (() => {
        if (commentAuthorId === myUserId)
          return "me";
        else if (userModel.isSubscribing(commentAuthorId))
          return "following";
        else
          return "other";
      })(),
      isCommentAuthorPostAuthor: (commentAuthorId === postAuthorId),
  
      commentAuthorName: (() => {
        if (commentAuthorId === myUserId)
          return "나";
        else
          return userModel.getAlias(commentAuthorId);
      })(),
      commentAuthorEmoji: commentAuthor.profile.thumb.emoji,
      goToCommentAuthorPage: () => navigate(`/profile/${commentAuthorId}`),
  
      commentText: comment.content,
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