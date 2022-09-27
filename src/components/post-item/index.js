import React from "react";
import { Link, useNavigate } from "react-router-dom";
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


  const location = useSelector(state => state.global.location);

  const makeTag = ({ tagId, tagName }) => (<li key={tagId} className="tag">{tagName}</li>);

  return (
    <article className="post-item">
      <div className="link" onClick={() => navigate(`/post`)} />

      <header className="header">
        <a href={post.shop.link} className="shop">
          <div className="thumb" style={{ backgroundImage: `url(${post.shop.thumb})` }} />
          <div className="text-wrap">
            <p className="name">{post.shop.shopName}</p>
            <p className="date">{post.shop.address} · {getDistance(location, {
              lati: post.shop.lati,
              longi: post.shop.longi
            })}km</p>
          </div>
        </a>
        <div onClick={() => navigate(`/profile/${post.user.userId}`)} className={`profile ${post.user.userId === myUserId ? "me" : (userViewModel.isSubscribing(post.user.userId) ? "subscribing" : "")}`}>
          <div className="chip">
            <div className="thumb" style={{ backgroundColor: post.user.background }}>{post.user.emoji}</div>
            <p className="name">{post.user.userId === myUserId ? "나" : userViewModel.getAlias(post.user.userId)}</p>
          </div>
          <p className="location">{getTime(post.createdAt)}{post.user.userId === myUserId ? "" : ` · ${userViewModel.isSubscribing(post.user.userId) ? "구독" : "근처"}`}</p>
        </div>
      </header>

      <nav className="tag-wrap">
        <SellIconBorder height="1.25rem" fill="#999" />
        <ul className="tags">{post.tags.map(makeTag)}</ul>
      </nav>

      <main className="body">
        <p className="text">{post.text}</p>
        <div className="images" onClick={() => navigate(`/post`)}>
          <ImageSlider images={post.postFileImgUrls} />
        </div>
      </main>

      <footer className="footer">
        <div className="buttons">
          <button className="button">
            <div className="icon-sm">
              <ChatBubbleIconBorder />
            </div>
            <p>{post.bestComment?.text || "댓글이 없습니다."}</p>
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
            <p>{post.scrappedCount}</p>
          </button>
        </div>
        { post.commentCount > 0 && (
            <div className="comment">
              <div
                className="thumb"
                style={{ backgroundColor: post.bestComment.user.background }}
              >{post.bestComment.user.emoji}</div>
              <p>{post.bestComment.text}</p>
            </div>
          )
        }
      </footer>
    </article>
  );
}

export default PostItem;