import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getDistance, getTime } from "../../util";
import { UserModel, PostModel } from "../../models";
import { UserViewModel, PostViewModel } from "../../view-models";

import ImageSlider from "../image-slider";

import "./style.scoped.scss";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";


const PostItem = ({ postId, post, me }) => {
  const navigate = useNavigate();

  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();
  //const me = userViewModel.getMyData();

  const postViewModel = new PostViewModel(new PostModel());
  //const post = postViewModel.getData(index);
  const postAuthorId = post.userId;
  const postAuthor = userViewModel.getData(postAuthorId);

  const comment = post.comments[post.bestCommentIndex];
  const commentAuthorId = comment.userId;
  const commentAuthor = userViewModel.getData(commentAuthorId);

  const location = useSelector(state => state.global.location);

  const makeTag = (tag, idx) => (<li key={idx} className="tag">{tag}</li>);

  return (
    <article className="post-item">
      <div className="link" onClick={() => navigate(`/post`)} />

      <header className="header">
        <a href={post.shop.link} className="shop">
          <div className="thumb" style={{ backgroundImage: `url(${post.shop.thumb})` }} />
          <div className="text-wrap">
            <p className="name">{post.shop.name}</p>
            <p className="date">{post.shop.location.address} · {getDistance(location, post.shop.location)}km</p>
          </div>
        </a>
        <div onClick={() => navigate(`/profile/${postAuthorId}`)} className={`profile ${postAuthorId === myUserId ? "me" : (userViewModel.isSubscribing(postAuthorId) ? "subscribing" : "")}`}>
          <div className="chip">
            <div className="thumb" style={{ backgroundColor: postAuthor.profile.thumb.background }}>{postAuthor.profile.thumb.emoji}</div>
            <p className="name">{postAuthorId === myUserId ? "나" : userViewModel.getAlias(postAuthorId)}</p>
          </div>
          <p className="location">{getTime(post.createdAt)}{postAuthorId === myUserId ? "" : ` · ${userViewModel.isSubscribing(postAuthorId) ? "구독" : "근처"}`}</p>
        </div>
      </header>

      <nav className="tags-wrap">
        <SellIconBorder />
        <ul className="tags">{post.tags.map(makeTag)}</ul>
      </nav>

      <main className="body">
        <p className="text">{post.content.text}</p>
        <div className="images full" onClick={() => navigate(`/post`)}>
          <ImageSlider images={post.content.images} />
        </div>
      </main>

      <footer className="footer">
        <div className="buttons">
          <button className="button">
            <div className="icon-sm">
              <ChatBubbleIconBorder />
            </div>
            <p>{postViewModel.getCommentCount(postId)}</p>
          </button>
          <button className="button right">
            <div className="icon-sm icon-container">
              <MoreHorizIcon />
            </div>
          </button>
          <button className="button">
            <div className="icon-sm">
              <BookmarkIconBorder />
            </div>
            <p>{post.scrapped.length}</p>
          </button>
        </div>
        { post.comments.length > 0 && (
            <div className="comment">
              <div className="thumb" style={{ backgroundColor: commentAuthor.profile.thumb.background }}>{commentAuthor.profile.thumb.emoji}</div>
              <p>{comment.content}</p>
            </div>
          )
        }
      </footer>
    </article>
  );
}

export default PostItem;