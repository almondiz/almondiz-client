import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Frame, Pipe } from "../../util";
import { PostModel, CommentModel } from "../../models";
import { PostViewModel, CommentViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import BookmarkIconFill from "../../asset/icons/mui/bookmark-icon-fill";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SendIconBorder from "../../asset/icons/mui/send-icon-border";


const FloatController = ({ floatRef, post, createComment }) => {
  const navigate = useNavigate();

  const headerFrame = new Frame(), footerFrame = new Frame();
  const Header = () => {
    headerFrame.init([
      ( // main
        <section className="float-header-frame frame-1">
          <button className="button button-back" onClick={() => navigate(-1)}>
            <div className="icon"><ArrowBackIcon /></div>
          </button>
        </section>
      ),
    ]);
    return <div className="float-header light">{headerFrame.view()}</div>;
  };
  const Footer = () => {
    const tfPlaceholder = "댓글 입력";
    const [tf, setTf] = useState("");


    const [repliedCommentUnit, setRepliedCommentUnit] = useState(null);
    useEffect(() => {
      repliedCommentUnit && repliedCommentUnit.onShow();
      return () => (repliedCommentUnit && repliedCommentUnit.onHide());
    }, [repliedCommentUnit]);

    const commentDialog = {
      send: () => {
        if (repliedCommentUnit) {
          console.log("[Post.commentDialog]", `${repliedCommentUnit.repliedCommentId}에게 답글 : ${tf}`);
        } else {
          createComment(tf);
          console.log("[Post.commentDialog]", `댓글 : ${tf}`);
        }
        commentDialog.hide();
      },

      show: (_repliedCommentUnit) => {  // repliedCommentId, onShow, onHide
        setRepliedCommentUnit(_repliedCommentUnit);
        footerFrame.move(1);
      },
      hide: () => {
        setRepliedCommentUnit(null);
        setTf("");
        footerFrame.move(0);
      },
    };
    Pipe.set("commentDialog", commentDialog);


    const ButtonScrap = ({ post }) => {
      const [focus, setFocus] = useState(post.scrap);
      const onClick = () => setFocus(!focus);
      return (
        <button className={`button button-scrap ${focus ? "focus" : ""}`} onClick={onClick}>
          <div className="icon">{focus ? <BookmarkIconFill /> : <BookmarkIconBorder />}</div>
        </button>
      );
    };


    footerFrame.init([
      ( // main
        <section className="float-footer-frame frame-1">
          <div className="buttons">
            <button className="button button-comment" onClick={() => commentDialog.show()}>
              <div className="icon"><ChatBubbleIconBorder /></div>
              <p>댓글 쓰기</p>
            </button>
          </div>
          <div className="buttons right">
            <ButtonScrap post={post} />
          </div>
        </section>
      ),
      ( // comment
        <section className="float-footer-frame frame-2">
          <div className="comment-dialog">
            <button className="button button-back" onClick={() => commentDialog.hide()}>
              <div className="icon"><ArrowBackIosIcon /></div>
            </button>
            <div className="comment-input-box">
              <input type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
            </div>
            <button className="button button-comment-send" onClick={() => commentDialog.send()}>
              <div className="icon"><SendIconBorder /></div>
            </button>
          </div>
        </section>
      ),
    ]);
    return <div className="float-footer light">{footerFrame.view()}</div>;
  }

  useEffect(() => {
    (floatRef.current?.setHeader(<Header />), floatRef.current?.setFooter(<Footer />));
    return () => (floatRef.current?.setHeader(), floatRef.current?.setFooter());
  }, [floatRef.current]);

  return <></>;
};


const PostPage = ({ floatRef }) => {
  const { postId } = useParams();


  /** 4-0. POST API */
  const postViewModel = new PostViewModel(new PostModel());
  const [post, setPost] = useState([]);
  const readPost = async () => {
    setPost(await postViewModel.getPostByPostId(postId));
  };
  useEffect(() => { readPost(); }, []);
  /** */

  /** 5-0. COMMENT API */
  const commentViewModel = new CommentViewModel(new CommentModel());
  const [comments, setComments] = useState([]);
  const readComments = async () => {
    if (!post)  return;
    const postAuthorId = post.postAuthorId;
    setComments(await commentViewModel.readAllComments(postId, { postAuthorId }));
  };
  useEffect(() => { readComments(); }, [post]);

  const createComment = async (text) => {
    if (!post)  return;
    const success = await commentViewModel.createComment(post.postId, text);
    if (success)
      Pipe.get("reload")?.comments();
  };
  /** */

  Pipe.set("reload", {
    all: () => { readPost(); readComments(); },
    post: readPost,
    comments: readComments,
  });


  const ButtonMore = ({ post }) => {
    const [focus, setFocus] = useState(false);
    const onClick = () => setFocus(!focus);
    return (
      <button className={`button button-more ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };


  return (
    <div id="page">
      <header className="header">
        <div className="right">
          <ButtonMore />
        </div>
      </header>

      <main className="content"><PostItem post={post} comments={comments} detail={true} /></main>

      <FloatController floatRef={floatRef} post={post} createComment={createComment} />
    </div>
  );
};

export default PostPage;