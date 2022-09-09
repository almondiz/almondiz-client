import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FeedModel, UserModel } from "../../models";
import UserViewModel from "../../view-models/user";

import "./style.scoped.scss";

import BackIcon from "../../asset/icons/mui/back-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SendIconBorder from "../../asset/icons/mui/send-icon-border";


const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) >= 5) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};


const FloatHeader = () => {
  const scrollDirection = useScrollDirection();

  return (
    <header className={`float-header ${scrollDirection === "down" ? "hide" : ""}`}>
      <Link to={"/"} className="button-back icon">
        <BackIcon height="1.5rem" fill="var(--primary-text-color)" />
      </Link>
    </header>
  );
};
const FloatFooter = () => {
  const scrollDirection = useScrollDirection();

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
            <ChatBubbleIconBorder height="1.5rem" fill="var(--primary-text-color)" />
          </div>
          <p>댓글 쓰기</p>
        </button>
  
        <button className="button-scrap icon-md">
          <BookmarkIconBorder height="1.5rem" fill="var(--primary-text-color)" />
        </button>
      </section>
    );
  };
  const FloatFooterComment = ({ moveFrame }) => {
    return (
      <section className="frame-comment">
        <button className="button-back icon-md" onClick={moveFrame(-1)}>
          <ArrowBackIosIcon height="1.5rem" fill="var(--primary-text-color)" />
        </button>
        <div className="comment-input-box">
          <input type="text" autoFocus />
          <button className="button-send icon-sm right">
            <SendIconBorder height="1.5rem" fill="var(--primary-text-color)" />
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
    <aside className={`float-footer ${scrollDirection === "up" ? "hide" : ""}`}>
      {frames[currentFrameIndex]}
    </aside>
  );
};

const Post = ({ post, makePost, makeImageViewer }) => {
  return (
    <div className="page-wrap">
      <FloatHeader />

      <header className="header">
        <button className="button-more icon-sm right">
          <MoreHorizIcon height="1.5rem" fill="var(--primary-text-color)" />
        </button>
      </header>
      
      {makePost(post)}

      <FloatFooter />

      {makeImageViewer(post.content.images)}
    </div>
  );
};

export default Post;