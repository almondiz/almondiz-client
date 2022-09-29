import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserModel, NoticeModel } from "../../models";
import { UserViewModel, NoticeViewModel } from "../../view-models";

import "./style.scoped.scss";
import ExploreIconFill from "../../asset/icons/mui/explore-icon-fill";
import ExploreIconBorder from "../../asset/icons/mui/explore-icon-border";
import SearchIconFill from "../../asset/icons/mui/search-icon-fill";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import BookmarkIconFill from "../../asset/icons/mui/bookmark-icon-fill";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import AccountCircleIconFill from "../../asset/icons/mui/account-circle-icon-fill";
import AccountCircleIconBorder from "../../asset/icons/mui/account-circle-icon-border";


const BottomNav = () => {
  const { pathname } = useLocation();

  const scrollDirection = useSelector(state => state.global.scrollDirection);

  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();
  const noticeViewModel = new NoticeViewModel(new NoticeModel());

  const [index, setIndex] = useState(null);

  const pathToIndex = { "/feed": 0, "/search": 1, "/scrap": 2, "/me": 3, };
  pathToIndex[`/profile/${myUserId}`] = 3;
  useEffect(() => { setIndex(pathToIndex[pathname]); }, [pathname]);

  const paths = [ "/feed", "/search", "/scrap", "/me", ];
  const icons = [
    [ExploreIconBorder, ExploreIconFill],
    [SearchIconBorder, SearchIconFill],
    [BookmarkIconBorder, BookmarkIconFill],
    [AccountCircleIconBorder, AccountCircleIconFill],
  ];
  const borderStyle = [
    { background: `linear-gradient(to right, var(--content-text-color) 12.5%, transparent 37.5%)` },
    { background: `linear-gradient(to right, transparent 12.5%, var(--content-text-color) 37.5%, transparent 62.5%)` },
    { background: `linear-gradient(to right, transparent 37.5%, var(--content-text-color) 62.5%, transparent 87.5%)` },
    { background: `linear-gradient(to right, transparent 62.5%, var(--content-text-color) 87.5%)` },
  ];
  const makeButton = (icon, idx) => {
    const focus = idx === index;
    const Icon = icon[focus ? 1 : 0];
    return (
      <Link key={idx} to={paths[idx]} className="button">
        <div className={`icon-sm icon-container ${focus ? "focus" : ""} ${(idx === 3 && userViewModel.hasUnreadNotices(noticeViewModel)) ? "badge" : ""}`}>
          <Icon />
        </div>
      </Link>
    )
  };

  return (
    <nav className={`bottom-nav ${scrollDirection === -1 ? "hide" : ""}`}>
      <div className="border" style={borderStyle[index] && {}} />
      <ul className="buttons">
        {icons.map(makeButton)}
      </ul>
    </nav>
  );
};

export default BottomNav;