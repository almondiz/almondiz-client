import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import store from "../../store";

import "./style.scoped.scss";
import ExploreIconFill from "../../asset/icons/mui/explore-icon-fill";
import ExploreIconBorder from "../../asset/icons/mui/explore-icon-border";
import SearchIconFill from "../../asset/icons/mui/search-icon-fill";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import BookmarkIconFill from "../../asset/icons/mui/bookmark-icon-fill";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import AccountCircleIconFill from "../../asset/icons/mui/account-circle-icon-fill";
import AccountCircleIconBorder from "../../asset/icons/mui/account-circle-icon-border";
import AddIcon from "../../asset/icons/mui/add-icon";


const PostBottomNav = () => {
  const navigate = useNavigate();

  const hasUnreadNotices = false;   // ### FUTURE WORKS

  const pathToIndex = { "/feed": 0, "/search": 1, "/scrap": 2, "/me": 3, };
  const myUserId = store.getState().account.myUserId;
  pathToIndex[`/user/${myUserId}`] = 3;

  const [index, setIndex] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => { setIndex(pathToIndex[pathname]); }, [pathname]);

  const paths = [ "/feed", "/search", "/scrap", "/me", ];
  const icons = [
    [ExploreIconBorder, ExploreIconFill],
    [SearchIconBorder, SearchIconFill],
    [BookmarkIconBorder, BookmarkIconFill],
    [AccountCircleIconBorder, AccountCircleIconFill],
  ];
  const borderStyle = [
    { background: `linear-gradient(to right, var(--content-text-color) 10%, transparent 40%)` },
    { background: `linear-gradient(to right, transparent 0%, var(--content-text-color) 30%, transparent 60%)` },
    { background: `linear-gradient(to right, transparent 40%, var(--content-text-color) 70%, transparent 100%)` },
    { background: `linear-gradient(to right, transparent 60%, var(--content-text-color) 90%)` },
  ];

  const makeButton = idx => {
    const focus = (idx === index);
    const Icon = icons[idx][focus ? 1 : 0];
    return (
      <button className="button" onClick={() => navigate(paths[idx])}>
        <div className={`icon ${focus ? "focus" : ""} ${(idx === 3 && hasUnreadNotices) ? "badge" : ""}`}><Icon /></div>
      </button>
    )
  };

  const makeButtonWrite = () => {
    return (
      <button className="button button-write" onClick={() => navigate(`/edit`)}>
        <div className="icon"><AddIcon /></div>
      </button>
    );
  };

  return (
    <nav className="float-bottom">
      <div className="border" style={borderStyle[index]} />
      <ul className="buttons">
        {makeButton(0)}
        {makeButton(1)}
        {makeButtonWrite()}
        {makeButton(2)}
        {makeButton(3)}
      </ul>
    </nav>
  );
};

export default PostBottomNav;