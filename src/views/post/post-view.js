import React from "react";
import { Link } from "react-router-dom";

import "./style.scoped.scss";

import { FeedModel, UserModel } from "../../models";
import UserViewModel from "../../view-models/user";

import BackIcon from "../../asset/icons/back-icon";
import MoreHorizIcon from "../../asset/icons/more-horiz-icon";

import ChatBubbleIconBorder from "../../asset/icons/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/bookmark-icon-border";


const Post = ({ post, makePost }) => {
  return (
    <div className="page-wrap">
      <header className="page-header float">
        <Link to={"/feed"} className="icon">
          <BackIcon height="1.5rem" fill="var(--primary-text-color)" />
        </Link>
      </header>
      <header className="page-header">
        <div className="icon right">
          <MoreHorizIcon height="1.5rem" fill="var(--primary-text-color)" />
        </div>
      </header>
      {makePost(post)}
      <aside>
        <div id="button-comment" className="icon">
          <div className="icon">
            <ChatBubbleIconBorder height="1.5rem" fill="var(--primary-text-color)" />
          </div>
          <p>댓글 쓰기</p>
        </div>

        <div className="icon right">
          <BookmarkIconBorder height="1.5rem" fill="var(--primary-text-color)" />
        </div>
      </aside>
    </div>
  );
};

export default Post;