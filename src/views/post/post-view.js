import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import "./style.scoped.scss";

import BackIcon from "../../asset/icons/mui/back-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SendIconBorder from "../../asset/icons/mui/send-icon-border";


const FloatHeader = () => {
  const { scrollDirection } = useSelector(state => ({
    scrollDirection: state.global.scrollDirection,
  }));

  return (
    <header className={`float-header ${scrollDirection === 1 ? "hide" : ""}`}>
      <Link to={"/"} className="button-back icon-sm">
        <BackIcon />
      </Link>
    </header>
  );
};
const FloatFooter = () => {
  const { scrollDirection } = useSelector(state => ({
    scrollDirection: state.global.scrollDirection,
  }));

  const [ currentFrameIndex, setCurrentFrameIndex ] = useState(0);
  const moveFrame = inc => {
    let _currentFrameIndex = currentFrameIndex;
    _currentFrameIndex += inc;
    _currentFrameIndex = Math.min(Math.max(_currentFrameIndex, 0), frames.length);
    return () => setCurrentFrameIndex(_currentFrameIndex);
  };

  const FloatFooterMain = ({ moveFrame }) => {
    return (
      <section className="frame-main">
        <button className="button-comment" onClick={moveFrame(1)} >
          <div className="icon-sm">
            <ChatBubbleIconBorder />
          </div>
          <p>댓글 쓰기</p>
        </button>
  
        <button className="button-scrap icon-sm">
          <BookmarkIconBorder />
        </button>
      </section>
    );
  };
  const FloatFooterComment = ({ moveFrame }) => {
    return (
      <section className="frame-comment">
        <button className="button-back icon-sm" onClick={moveFrame(-1)}>
          <ArrowBackIosIcon />
        </button>
        <div className="comment-input-box">
          <input type="text" autoFocus />
          <button className="button-send icon-sm right">
            <SendIconBorder />
          </button>
        </div>
      </section>
    );
  };
  const frames = [
    <FloatFooterMain moveFrame={moveFrame} />,
    <FloatFooterComment moveFrame={moveFrame} />,
  ];
  return (
    <aside className={`float-footer ${scrollDirection === -1 ? "hide" : ""}`}>
      {frames[currentFrameIndex]}
    </aside>
  );
};

const Post = ({ post, makePost, makeImageViewer }) => {
  return (
    <div className="page-wrap">
      <FloatHeader />

      <header className="header">
        <div className="right">
          <button className="button-more icon-sm icon-container">
            <MoreHorizIcon />
          </button>
        </div>
      </header>
      
      {makePost(post)}

      <FloatFooter />

      {makeImageViewer(post.content.images)}
    </div>
  );
};

export default Post;