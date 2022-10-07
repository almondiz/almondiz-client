import React, { useState } from "react";

import "./style.scoped.scss";
import FavoriteIconBorder from "../../asset/icons/mui/favorite-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const CommentItem = ({ data, root=false }) => {
  const [focusReply, setFocusReply] = useState(false);
  const onClickReply = () => {
    setFocusReply(!focusReply);
  };

  return (
    <li className="comment-item">
      <article className={`comment-unit ${focusReply ? "adding-reply" : ""}`}>
        <div className="background" />

        <header className="header">
          <button
            className={`profile ${data.commentAuthorType} ${data.isCommentAuthorPostAuthor ? "author" : ""}`}
            onClick={data.goToCommentAuthorPage}
          >
            <p className="emoji">{data.commentAuthorEmoji}</p>
            <p className="name">{data.commentAuthorName}</p>
          </button>
          <p className="description">{data.commentCreatedAt}</p>
          <div className="buttons right">
            <button className="button button-comment-more">
              <div className="icon"><MoreHorizIcon /></div>
            </button>
          </div>
        </header>
        <p className="text">{data.commentText}</p>
        <footer className="footer">
          { root && (
            <div className="buttons">
              <button className="button button-comment-reply" onClick={onClickReply}>
                <p>{focusReply ? "답글 작성 중..." : "답글"}</p>
              </button>
            </div>
          )}
          <div className="buttons right">
            <button className="button button-comment-favorite">
              <FavoriteIconBorder />
              <p>{data.commentLikedCount}</p>
            </button>
          </div>
        </footer>
      </article>

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