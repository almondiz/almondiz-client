import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Frame } from "../../util";
import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SendIconBorder from "../../asset/icons/mui/send-icon-border";


const FloatController = ({ floatRef }) => {
  const navigate = useNavigate();

  const headerFrame = new Frame(), footerFrame = new Frame();
  const Header = () => {
    headerFrame.init([
      ( // main
        <section className="float-header-frame frame-1">
          <button className="button-back icon-sm" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        </section>
      ),
    ]);
    return <div className="float-header">{headerFrame.view()}</div>;
  };
  const Footer = () => {
    footerFrame.init([
      ( // main
        <section className="float-footer-frame frame-1">
          <button className="button-comment" onClick={() => footerFrame.walk(1)}>
            <div className="icon-sm"><ChatBubbleIconBorder /></div>
            <p>댓글 쓰기</p>
          </button>
    
          <button className="button-scrap icon-sm">
            <BookmarkIconBorder />
          </button>
        </section>
      ),
      ( // comment
        <section className="float-footer-frame frame-2">
          <button className="button-back icon-sm" onClick={() => footerFrame.walk(-1)}>
            <ArrowBackIosIcon />
          </button>
          <div className="comment-input-box">
            <input type="text" placeholder="댓글 입력" autoFocus />
          </div>
          <button className="button-comment-send icon-sm right">
            <SendIconBorder />
          </button>
        </section>
      ),
    ]);
    return <div className="float-footer">{footerFrame.view()}</div>;
  }

  useEffect(() => {
    (floatRef.current?.setHeader(<Header />), floatRef.current?.setFooter(<Footer />));
    return () => (floatRef.current?.setHeader(), floatRef.current?.setFooter());
  }, [floatRef.current]);

  return <></>;
};


const Post = ({ floatRef, postId }) => {
  // POST API
  const data = (postId => {
    const postViewModel = new PostViewModel(new PostModel());
    return postViewModel.getData(postId);
  })(postId);
  //


  return (
    <div className="page">
      <header className="header">
        <div className="right">
          <button className="button-more icon-sm icon-container">
            <MoreHorizIcon />
          </button>
        </div>
      </header>

      <main className="content">
        <PostItem data={data} detail={true} />
      </main>

      <FloatController floatRef={floatRef} />
    </div>
  );
};

export default Post;