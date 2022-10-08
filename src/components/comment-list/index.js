import React, { useState, useRef } from "react";

import { Pipe } from "../../util";

import "./style.scoped.scss";
import FavoriteIconBorder from "../../asset/icons/mui/favorite-icon-border";
import FavoriteIconFill from "../../asset/icons/mui/favorite-icon-fill";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const CommentUnit = ({ data, root=false }) => {
  const commentUnitRef = useRef();

  const ButtonLike = ({ data }) => {
    const [focus, setFocus] = useState(data.like);
    const onClick = () => setFocus(!focus);
    return (
      <button className={`button button-comment-like ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon">{focus ? <FavoriteIconFill /> : <FavoriteIconBorder />}</div>
        <p>{data.commentLikedCount}</p>
      </button>
    );
  };
  const ButtonReply = ({ data, commentUnitRef }) => {
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

      if (focus)
        Pipe.get("commentDialog")?.hide();
      else
        Pipe.get("commentDialog")?.show({
          repliedCommentId: data.commentId,
          onShow,
          onHide
        });
    };
    return (
      <button className={`button button-comment-reply ${focus ? "focus" : ""}`} onClick={onClick}>
        <p>{focus ? "답글 작성 중..." : "답글"}</p>
      </button>
    );
  };
  const ButtonMore = ({ data }) => {
    const [focus, setFocus] = useState(false);
    const onClick = () => setFocus(!focus);
    return (
      <button className={`button button-comment-more ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };

  return (
    <article className="comment-unit" data-id={data.commentId} ref={commentUnitRef}>
      <div className="background" />

      <header className="header">
        <button className="profile" onClick={data.goToCommentAuthorPage}
          data-type={data.commentAuthorType}
          data-author={data.isCommentAuthorPostAuthor}
          data-after={data.isCommentAuthorPostAuthor ? "글쓴이" : undefined}
        >
          <p className="emoji">{data.commentAuthorEmoji}</p>
          <p className="name">{data.commentAuthorName}</p>
        </button>
        <p className="description">{data.commentCreatedAt}</p>
        <div className="buttons right">
          <ButtonMore data={data} />
        </div>
      </header>
      <p className="text">{data.commentText}</p>
      <footer className="footer">
        { root && (
          <div className="buttons">
            <ButtonReply data={data} commentUnitRef={commentUnitRef} /> 
          </div>
        )}
        <div className="buttons right">
          <ButtonLike data={data} />
        </div>
      </footer>
    </article>
  );
};


const CommentItem = ({ data, root=false }) => {
  return (
    <li className="comment-item">
      <CommentUnit data={data} root={root} />
      { root && <CommentList dataList={data.replyComments} root={false} /> }
    </li>
  );
};

const CommentList = ({ dataList, root=false }) => {
  return (
    <ul className={`comment-list ${root ? "root" : ""}`}>
      {dataList.map((data, idx) => <CommentItem key={idx} data={data} root={root} />)}
    </ul>
  );
};

export default CommentList;