import React, { useState, useRef } from "react";

import { Pipe } from "../../util";

import "./style.scoped.scss";
import FavoriteIconBorder from "../../asset/icons/mui/favorite-icon-border";
import FavoriteIconFill from "../../asset/icons/mui/favorite-icon-fill";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const CommentUnit = ({ comment={}, root=false }) => {
  const commentUnitRef = useRef();

  const ButtonLike = ({ comment }) => {
    const [focus, setFocus] = useState(comment.isLiked);
    const onClick = async () => {
      const success = await comment.like(focus);
      if (success) {
        setFocus(!focus);
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
      const onShow = () => {
        setFocus(true);
        commentUnitRef.current?.classList.add("focus");
      };
      const onHide = () => {
        setFocus(false);
        commentUnitRef.current?.classList.remove("focus");
      };

      const commentDialogController = Pipe.get("commentDialogController");
      if (focus)
        commentDialogController?.hide();
      else
        commentDialogController?.show({ onShow, onHide, reply: comment.reply });
    };
    return (
      <button className={`button button-comment-reply ${focus ? "focus" : ""}`} onClick={onClick}>
        <p>{focus ? "답글 올리는 중..." : "답글"}</p>
      </button>
    );
  };
  const ButtonMore = ({ comment }) => {
    const [focus, setFocus] = useState(false);
    const onClick = async () => {
      const success = await comment.delete();
      if (success)
        Pipe.get("reload")?.comments();
    }
    //const onClick = () => setFocus(!focus);
    return (
      <button className={`button button-comment-more ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };

  return (
    <article className="comment-unit" data-comment-id={comment.commentId} ref={commentUnitRef}>
      <div className="background" />

      <header className="header">
        <button className="profile" onClick={comment.goToCommentAuthorPage}
          data-user-relation={comment.commentAuthorRelation}
          data-is-author={comment.isCommentAuthorPostAuthor}
          data-after={comment.isCommentAuthorPostAuthor ? "글쓴이" : undefined}
        >
          <p className="emoji">{comment.commentAuthorEmoji}</p>
          <p className="name">{comment.commentAuthorName}</p>
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