import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getDistance, getTime } from "../../models/global";

import ImageSlider from "../image-slider";

import "./style.scoped.scss";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";


const PostItem = ({ index, post, me }) => {
  const navigate = useNavigate();

  const location = useSelector(state => state.global.location);

  const makeTag = (tag, index) => (<li className="tag" key={index}>{tag}</li>);

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
        <div onClick={() => navigate(`/profile/${post.profile.uid}`)} className={`profile ${post.profile.uid === me.profile.uid ? "me" : (post.profile.isFollowed ? "follower" : "")}`}>
          <div className="chip">
            <div className="thumb" style={{ backgroundColor: post.profile.thumb.background }}>{post.profile.thumb.emoji}</div>
            <p className="name">{post.profile.uid === me.profile.uid ? "나" : post.profile[post.profile.isFollowed ? "alias" : "name"]}</p>
          </div>
          <p className="location">{getTime(post.createdAt)}{post.profile.uid === me.profile.uid ? "" : ` · ${post.profile.isFollowed ? "구독" : "근처"}`}</p>
        </div>
      </header>

      <nav className="tag-wrap">
        <SellIconBorder height="1.25rem" fill="#999" />
        <ul className="tags">{post.tags.map(makeTag)}</ul>
      </nav>

      <main className="body">
        <p className="text">{post.content.text}</p>
        <div className="images" onClick={() => navigate(`/post`)}>
          <ImageSlider images={post.content.images} />
        </div>
      </main>

      <footer className="footer">
        <div className="buttons">
          <button className="button">
            <div className="icon-sm">
              <ChatBubbleIconBorder />
            </div>
            <p>{post.reaction.commentCount}</p>
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
            <p>{post.reaction.scrapCount}</p>
          </button>
        </div>
        { post.reaction.comments.length > 0 && (
            <div className="comment">
              <div className="thumb" style={{ backgroundColor: post.reaction.comments[0].profile.thumb.background }}>{post.reaction.comments[0].profile.thumb.emoji}</div>
              <p>{post.reaction.comments[0].content}</p>
            </div>
          )
        }
      </footer>
    </article>
  );
}

export default PostItem;