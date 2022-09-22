import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserModel, NoticeModel } from "../../models";
import UserViewModel from "../../view-models/user";
import NoticeViewModel from "../../view-models/notice";

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
  const scrollDirection = useSelector(state => state.global.scrollDirection);

  const userViewModel = new UserViewModel(new UserModel());
  const noticeViewModel = new NoticeViewModel(new NoticeModel());

  const [currentIndex, setCurrentIndex] = useState(0);
  const makeButton = ({ icon, path }, index) => {
    const focus = index === currentIndex;
    const Icon = icon[focus ? 1 : 0];
    return (
      <Link to={path} key={index} className="button" onClick={() => setCurrentIndex(index)}>
        <div className={`icon-sm icon-container ${focus ? "focus" : ""} ${(index === 3 && userViewModel.hasUnreadNotices(noticeViewModel)) ? "badge" : ""}`}>
          <Icon />
        </div>
      </Link>
    )
  };

  const iconList = [
    {
      icon: [ExploreIconBorder, ExploreIconFill],
      path: "/feed",
    },
    {
      icon: [SearchIconBorder, SearchIconFill],
      path: "/search",
    },
    {
      icon: [BookmarkIconBorder, BookmarkIconFill],
      path: "/scrap",
    },
    {
      icon: [AccountCircleIconBorder, AccountCircleIconFill],
      path: "/me",
    },
  ];

  const borderStyle = (_currentIndex => {
    switch (_currentIndex) {
      case 0:
        return { background: `linear-gradient(to right, var(--content-text-color) 12.5%, transparent 37.5%)` };
      case 1:
        return { background: `linear-gradient(to right, transparent 12.5%, var(--content-text-color) 37.5%, transparent 62.5%)` };
      case 2:
        return { background: `linear-gradient(to right, transparent 37.5%, var(--content-text-color) 62.5%, transparent 87.5%)` };
      case 3:
        return { background: `linear-gradient(to right, transparent 62.5%, var(--content-text-color) 87.5%)` };
      default:
        return {};
    }
  })(currentIndex);

  return (
    <nav className={`bottom-nav ${scrollDirection === -1 ? "hide" : ""}`}>
      <div className="border" style={borderStyle} />
      <ul className="buttons">
        {iconList.map(makeButton)}
      </ul>
    </nav>
  );
};

export default BottomNav;