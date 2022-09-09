import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./style.scoped.scss";

import { FeedModel, UserModel } from "../../models";
import UserViewModel from "../../view-models/user";

import BackIcon from "../../asset/icons/mui/back-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";

import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";

import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SendIconBorder from "../../asset/icons/mui/send-icon-border";


const FloatMenu = () => {
  const [ currentFrameIndex, setCurrentFrameIndex ] = useState(0);
  const moveFrame = inc => {
    let _currentFrameIndex = currentFrameIndex;
    _currentFrameIndex += inc;
    _currentFrameIndex = Math.min(Math.max(_currentFrameIndex, 0), frames.length);
    return () => setCurrentFrameIndex(_currentFrameIndex);
  };

  const FloatMenuMain = ({ moveFrame }) => {
    return (
      <section className="frame-main">
        <div className="button-comment" onClick={moveFrame(1)} >
          <div className="icon">
            <ChatBubbleIconBorder height="1.5rem" fill="var(--primary-text-color)" />
          </div>
          <p>댓글 쓰기</p>
        </div>
  
        <div className="button-scrap icon right">
          <BookmarkIconBorder height="1.5rem" fill="var(--primary-text-color)" />
        </div>
      </section>
    );
  };
  const FloatMenuComment = ({ moveFrame }) => {
    return (
      <section className="frame-comment">
        <div className="button-back icon" onClick={moveFrame(-1)}>
          <ArrowBackIosIcon height="1.5rem" fill="var(--primary-text-color)" />
        </div>
        <div className="comment-input-box">
          <input type="text" autoFocus />
          <div className="button-send icon right">
            <SendIconBorder height="1.5rem" fill="var(--primary-text-color)" />
          </div>
        </div>
      </section>
    );
  };
  const frames = [
    <FloatMenuMain moveFrame={moveFrame} />,
    <FloatMenuComment moveFrame={moveFrame} />,
  ];
  return (
    <aside className="float-menu">
      {frames[currentFrameIndex]}
    </aside>
  );
};

const Post = ({ post, makePost }) => {
  return (
    <div className="page-wrap">
      <header className="header float">
        <Link to={"/"} className="icon">
          <BackIcon height="1.5rem" fill="var(--primary-text-color)" />
        </Link>
      </header>
      <header className="header">
        <div className="icon right">
          <MoreHorizIcon height="1.5rem" fill="var(--primary-text-color)" />
        </div>
      </header>
      {makePost(post)}

      <FloatMenu />
    </div>
  );
};

export default Post;