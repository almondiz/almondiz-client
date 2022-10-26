import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs, Pipe } from "../../util";
import { ModalDefaultMenuList } from "../modal-default-forms";

import "./style.scoped.scss";
import FavoriteIconBorder from "../../asset/icons/mui/favorite-icon-border";
import FavoriteIconFill from "../../asset/icons/mui/favorite-icon-fill";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const CommentUnit = ({ comment={}, root=false }) => {
  const navigate = useNavigate();

  const { toastRef } = StaticComponentRefs;


  const deleteComment = async () => {
    const success = await comment.delete();
    if (success) {
      toastRef?.current?.log("댓글을 삭제했습니다.");
      Pipe.get("postPage")?.refreshAllComments();
    }
  };
  //const reportComment = async () => {};


  const ButtonLike = ({ comment }) => {
    const [focus, setFocus] = useState(comment.isLiked);
    const onClick = async () => {
      const b = !focus;
      const success = await comment.like(b);
      if (success) {
        toastRef?.current?.log(b ? "좋아요했습니다." : "좋아요가 취소되었습니다.");
        setFocus(b);
      }
    };
    return (
      <button className={`button button-comment-like ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon">{focus ? <FavoriteIconFill /> : <FavoriteIconBorder />}</div>
        <p>{comment.commentLikedCount}</p>
      </button>
    );
  };
  const ButtonReply = ({ comment, commentUnitRef }) => {
    const [focus, setFocus] = useState(false);
    const onClick = () => {
      const onShowCallback = () => {
        setFocus(true);
        commentUnitRef.current?.classList.add("focus");
      };
      const onHideCallback = () => {
        setFocus(false);
        commentUnitRef.current?.classList.remove("focus");
      };

      const commentInputController = Pipe.get("commentInput");
      if (focus)
        commentInputController?.hide();
      else
        commentInputController?.show({ onShowCallback, onHideCallback, reply: comment.reply });
    };
    return (
      <button className={`button button-comment-reply ${focus ? "focus" : ""}`} onClick={onClick}>
        <p>{focus ? "답글 올리는 중..." : "답글"}</p>
      </button>
    );
  };
  const ButtonMore = ({ comment }) => {
    const { modalRef } = StaticComponentRefs;
    const modalDefaultMenuListRef = useRef();

    const onClickModalDelete = deleteComment;
    //const onClickModalReport = () => {};

    const showModal = () => {
      const myCommentMenus = [
        { title: "삭제하기", choice: "DELETE", danger: true },
      ];
      const otherCommentMenus = [
        { title: "신고하기", choice: "REPORT", },
      ];

      modalRef?.current?.show(
        <ModalDefaultMenuList modalRef={modalRef} ref={modalDefaultMenuListRef}
          menus={(comment.commentAuthorRelation === "me") ? myCommentMenus : otherCommentMenus}
        />,
        async () => {
          const { choice } = modalDefaultMenuListRef.current?.destruct();
          switch (choice) {
            case "DELETE":
              return onClickModalDelete();
            case "REPORT":
              return;//onClickModalReport();
          }
        }
      );
    };
    return (
      <button className="button button-comment-more" onClick={showModal}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };

  const commentUnitRef = useRef();

  return (
    <article className="comment-unit" data-comment-id={comment.commentId} ref={commentUnitRef}>
      <div className="background" />

      <header className="header">
        <button className="profile" onClick={() => comment.goToCommentAuthorPage(navigate)}
          data-user-relation={comment.commentAuthorRelation}
          data-is-author={comment.isCommentAuthorPostAuthor}
        >
          <p className="emoji">{comment.commentAuthorEmoji}</p>
          <p className="name">{comment.commentAuthorName}</p>
          {comment.isCommentAuthorPostAuthor && <p className="name-tag">{"글쓴이"}</p>}
        </button>
        <p className="description">{comment.commentCreatedAt}</p>
        <div className="buttons right">
          <ButtonMore comment={comment} />
        </div>
      </header>
      <p className="text">{comment.commentText}</p>
      <footer className="footer">
        { root && (
          <div className="buttons">
            <ButtonReply comment={comment} commentUnitRef={commentUnitRef} /> 
          </div>
        )}
        <div className="buttons right">
          <ButtonLike comment={comment} />
        </div>
      </footer>
    </article>
  );
};


const CommentItem = ({ comment={}, root=false }) => {
  return (
    <li className="comment-item">
      <CommentUnit comment={comment} root={root} />
      { root && <CommentList comments={comment.replyComments} root={false} /> }
    </li>
  );
};

const CommentList = ({ comments=[], root=false }) => {
  return (
    <ul className={`comment-list ${root ? "root" : ""}`}>
      {comments.map((comment, idx) => <CommentItem key={idx} comment={comment} root={root} />)}
    </ul>
  );
};

export default CommentList;