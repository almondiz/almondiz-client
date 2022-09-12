import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const makeIcon = ({ icon, path }, index) => {
    const focus = index === currentIndex;
    const Icon = icon[focus ? 1 : 0];
    return (
      <Link to={path} key={index} className="icon-wrap" onClick={() => setCurrentIndex(index)}>
        <div className={`icon-sm icon-container ${focus ? "focus" : ""} ${index === 3 ? "badge" : ""}`}>
          <Icon />
        </div>
      </Link>
    )
  };

  const iconList = [
    {
      icon: [ExploreIconBorder, ExploreIconFill],
      path: "/",
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

  const gradientStyle = (_currentIndex => {
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
    <nav className={`bottom-nav-wrap ${scrollDirection === -1 ? "hide" : ""}`}>
      <div className="bottom-nav-border" style={gradientStyle} />
      <ul className="bottom-nav">
        {iconList.map(makeIcon)}
      </ul>
    </nav>
  );
};

export default BottomNav;