import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Framer, getDistance, getTime } from "../../models/global";
import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import ImageGrid from "../../components/image-grid";
import ImageView from "../../components/image-view";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SendIconBorder from "../../asset/icons/mui/send-icon-border";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";
import FavoriteIconBorder from "../../asset/icons/mui/favorite-icon-border";


const Float = () => {
  const Header = () => {
    const scrollDirection = useSelector(state => state.global.scrollDirection);
    return (
      <header className={`header ${scrollDirection === 1 ? "hide" : ""}`}>
        <Link to={"/feed"} className="button-back icon-sm">
          <BackIcon />
        </Link>
      </header>
    );
  };

  const Footer = () => {
    const framer = new Framer([
      // main frame
      (
        <section className="frame-main">
          <button className="button-comment" onClick={() => framer.walk(1)}>
            <div className="icon-sm">
              <ChatBubbleIconBorder />
            </div>
            <p>댓글 쓰기</p>
          </button>
    
          <button className="button-scrap icon-sm">
            <BookmarkIconBorder />
          </button>
        </section>
      ),
      // comment frame
      (
        <section className="frame-comment">
          <button className="button-back icon-sm" onClick={() => framer.walk(-1)}>
            <ArrowBackIosIcon />
          </button>
          <div className="comment-input-box">
            <input type="text" autoFocus />
            <button className="button-send icon-sm right">
              <SendIconBorder />
            </button>
          </div>
        </section>
      ),
    ]);

    const scrollDirection = useSelector(state => state.global.scrollDirection);
    return (
      <footer className={`footer ${scrollDirection === -1 ? "hide" : ""}`}>
        {framer.view()}
      </footer>
    );
  };

  return (
    <aside className="float">
      <Header />
      <Footer />
    </aside>
  )
};


const Post = ({ me, index }) => {
  const navigate = useNavigate();

  const feedViewModel = new FeedViewModel(new FeedModel());
  const post = feedViewModel.getPost(index);
  
  const location = useSelector(state => state.global.location);
  const makeTag = (tag, index) => (<li className="tag" key={index}>{tag}</li>);
  const makeComment = (comment, index) => {
    return (
      <article key={index} className={`comment-item ${comment.reply ? "" : "reply"}`}>
        <header className="header">
          <div
            className={`profile ${comment.profile.uid === me.profile.uid ? "me" : (comment.profile.isFollowed ? "follower" : "")} ${comment.profile.uid === post.profile.uid ? "writer" : ""}`}
            onClick={() => navigate(`/profile/${comment.profile.uid}`)}
          >
            <div className="thumb" style={{ backgroundColor: comment.profile.thumb.background }}>{comment.profile.thumb.emoji ? comment.profile.thumb.emoji : ""}</div>
            <p className="name">{comment.profile.uid === me.profile.uid ? "나" : comment.profile[comment.profile.isFollowed ? "alias" : "name"]}</p>
          </div>
          <p className="date">{getTime(comment.createdAt)}</p>
          <div className="icon more-icon">
            <MoreHorizIcon height="1.25rem" fill="#666" />
          </div>
          <button className="button-favorite right">
            <FavoriteIconBorder height="1.25rem" fill="#666" />
            <p>{comment.likeCount}</p>
          </button>
        </header>
        <p className="body">{comment.content}</p>
  
        {
          comment.reply && (
            <section className="comment-list reply">
              {comment.reply.map(makeComment)}
            </section>
          )
        }
      </article>
    );
  };

  const imageViewController = {};

  return (
    <div className="page">
      <ImageView images={post.content.images} controller={imageViewController} />

      <Float />
      
      <header className="header">
        <div className="right">
          <button className="button-more icon-sm icon-container">
            <MoreHorizIcon />
          </button>
        </div>
      </header>

      <main className="content">
        <article className="post">
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
                <div className="thumb" style={{ backgroundColor: post.profile.thumb.background }}>{post.profile.thumb.emoji ? post.profile.thumb.emoji : ""}</div>
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
            <div className="images">
              <ImageGrid images={post.content.images} shop={post.shop} controller={imageViewController} />
            </div>
    
            <div className="images">
              
            </div>
          </main>
    
          <footer className="footer">
            <p className="counts">{`댓글 ${post.reaction.commentCount} · 스크랩 ${post.reaction.scrapCount}`}</p>
            <section className="comment-list">
              {post.reaction.comments.map(makeComment)}
            </section>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default Post;