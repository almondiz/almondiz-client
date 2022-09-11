import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FeedModel, UserModel } from "../../models";
import FeedViewModel from "../../view-models/feed";
import UserViewModel from "../../view-models/user";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SendIconBorder from "../../asset/icons/mui/send-icon-border";
import CloseIcon from "../../asset/icons/mui/close-icon";
import NavigateBeforeIcon from "../../asset/icons/mui/navigate-before-icon";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


const ImageViewer = ({ images, setIndex, index }) => {
  const image = images[index];

  return index !== null && (
    <div className="image-viewer">
      <div className="background" style={{ /*backgroundImage: `url(${image})`*/ }} />
      <img className="image" src={image}></img>
      <button className="button-close icon-md" onClick={() => setIndex(null)}>
        <CloseIcon height="2rem" fill="#fff" />
      </button>
      <button className="button-prev icon-lg" onClick={() => setIndex((index + images.length - 1) % images.length)}>
        <NavigateBeforeIcon height="3rem" fill="#fff" />
      </button>
      <button className="button-next icon-lg" onClick={() => setIndex((index + 1) % images.length)}>
        <NavigateNextIcon height="3rem" fill="#fff" />
      </button>
      <p className="index">{`${index + 1} / ${images.length}`}</p>
    </div>
  );
};

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
    _currentFrameIndex = Math.min(Math.max(_currentFrameIndex, 0), frames.length - 1);
    if (_currentFrameIndex === currentFrameIndex)   return;
    return setCurrentFrameIndex(_currentFrameIndex);
  };

  const FloatFooterMain = ({ moveFrame }) => {
    return (
      <section className="frame-main">
        <button className="button-comment" onClick={() => moveFrame(1)} >
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
        <button className="button-back icon-sm" onClick={() => moveFrame(-1)}>
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

const Post = ({ index }) => {
  const feedViewModel = new FeedViewModel(new FeedModel());
  const userViewModel = new UserViewModel(new UserModel());

  // for image viewer
  const [imageViewerIndex, setImageViewerIndex] = useState(null);

  const post = feedViewModel.getPost(index);

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

      <PostItem index={index} post={post} user={userViewModel.getUserLocation()} setImageViewerIndex={setImageViewerIndex} />

      <FloatFooter />

      <ImageViewer images={post.content.images} setIndex={setImageViewerIndex} index={imageViewerIndex} />
    </div>
  );
};

export default Post;