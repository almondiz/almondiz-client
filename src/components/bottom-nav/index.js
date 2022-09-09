import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.scoped.scss";

import ExploreIconFill from "../../asset/icons/mui/explore-icon-fill";
import ExploreIconBorder from "../../asset/icons/mui/explore-icon-border";
import SearchIconFill from "../../asset/icons/mui/search-icon-fill";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import BookmarkIconFill from "../../asset/icons/mui/bookmark-icon-fill";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import AccountCircleIconFill from "../../asset/icons/mui/account-circle-icon-fill";
import AccountCircleIconBorder from "../../asset/icons/mui/account-circle-icon-border";


const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) >= 5) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};

const BottomNav = () => {
  const scrollDirection = useScrollDirection();

  const [currentIndex, setCurrentIndex] = useState(0);
  const makeIcon = ({ icon, path }, index) => {
    const focus = index === currentIndex;
    return (
      <Link to={path} key={index} className="icon-wrap" onClick={() => setCurrentIndex(index)}>
        <div className={`icon ${focus ? "focus" : ""} ${index === 3 ? "badge" : ""}`}>
          {icon[focus ? 1 : 0]({ height: "1.5rem", fill: "var(--primary-text-color)" })}
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
      path: "/",
    },
    {
      icon: [BookmarkIconBorder, BookmarkIconFill],
      path: "/",
    },
    {
      icon: [AccountCircleIconBorder, AccountCircleIconFill],
      path: "/my-page",
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
    <nav className={`bottom-nav-wrap ${scrollDirection === "up" ? "hide" : ""}`}>
      <div className="bottom-nav-border" style={gradientStyle} />
      <ul className="bottom-nav">
        {iconList.map(makeIcon)}
      </ul>
    </nav>
  );
};

export default BottomNav;