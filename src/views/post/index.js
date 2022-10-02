import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Framer, getDistance, getTime } from "../../util";
import { UserModel, PostModel } from "../../models";
import { UserViewModel, PostViewModel } from "../../view-models";

import ImageGrid from "../../components/image-grid";
import ImageViewer from "../../components/image-viewer";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SendIconBorder from "../../asset/icons/mui/send-icon-border";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";
import FavoriteIconBorder from "../../asset/icons/mui/favorite-icon-border";


const Float = () => {
  const navigate = useNavigate();

  const Header = () => {
    const scrollDirection = useSelector(state => state.global.scrollDirection);
    return (
      <header className={`header ${scrollDirection === 1 ? "hide" : ""}`}>
        <button className="button-back icon-sm" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>
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


const Post = ({ me, postId }) => {
  const navigate = useNavigate();

  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();
  //const me = userViewModel.getMyData();

  const postViewModel = new PostViewModel(new PostModel());
  const post = postViewModel.getData(postId);
  const postAuthorId = post.userId;
  const postAuthor = userViewModel.getData(postAuthorId);
  
  const location = useSelector(state => state.global.location);
  const makeTag = (tag, idx) => (<li key={idx} className="tag">{tag}</li>);
  const makeComment = (comment, idx) => {
    const commentAuthorId = comment.userId;
    const commentAuthor = userViewModel.getData(commentAuthorId);

    return (
      <article key={idx} className={`comment-item ${comment.reply ? "" : "reply"}`}>
        <header className="header">
          <div
            className={`profile ${commentAuthorId === myUserId ? "me" : (userViewModel.isSubscribing(commentAuthorId) ? "subscribing" : "")} ${commentAuthorId === postAuthorId ? "author" : ""}`}
            onClick={() => navigate(`/profile/${comment.userId}`)}
          >
            <div className="thumb" style={{ backgroundColor: commentAuthor.profile.thumb.background }}>{commentAuthor.profile.thumb.emoji ? commentAuthor.profile.thumb.emoji : ""}</div>
            <p className="name">{commentAuthorId === myUserId ? "나" : userViewModel.getAlias(commentAuthorId)}</p>
          </div>
          <p className="date">{getTime(comment.createdAt)}</p>
          <div className="icon more-icon">
            <MoreHorizIcon height="1.25rem" fill="#666" />
          </div>
          <button className="button-favorite right">
            <FavoriteIconBorder height="1.25rem" fill="#666" />
            <p>{comment.liked.length}</p>
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

  const imageViewerElement = useRef();
  const imageGridAction = index => imageViewerElement.current.setIndex(index);

  return (
    <div className="page">
      <ImageViewer images={post.content.images} ref={imageViewerElement} />

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
            <div onClick={() => navigate(`/profile/${postAuthorId}`)} className={`profile ${postAuthorId === myUserId ? "me" : (userViewModel.isSubscribing(postAuthorId) ? "subscribing" : "")}`}>
              <div className="chip">
                <div className="thumb" style={{ backgroundColor: postAuthor.profile.thumb.background }}>{postAuthor.profile.thumb.emoji ? postAuthor.profile.thumb.emoji : ""}</div>
                <p className="name">{postAuthorId === myUserId ? "나" : userViewModel.getAlias(postAuthorId)}</p>
              </div>
              <p className="location">{getTime(post.createdAt)}{postAuthorId === myUserId ? "" : ` · ${userViewModel.isSubscribing(postAuthorId) ? "구독" : "근처"}`}</p>
            </div>
          </header>
    
          <nav className="tag-wrap">
            <SellIconBorder />
            <ul className="tags">{post.tags.map(makeTag)}</ul>
          </nav>
    
          <main className="body">
            <p className="text">{post.content.text}</p>
            <div className="images full">
              <ImageGrid images={post.content.images} shop={post.shop} action={imageGridAction} />
            </div>
    
            <div className="images">
              
            </div>
          </main>
    
          <footer className="footer">
            <p className="counts">{`댓글 ${postViewModel.getCommentCount(postId)} · 스크랩 ${post.scrapped.length}`}</p>
            <section className="comment-list">
              {post.comments.map(makeComment)}
            </section>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default Post;