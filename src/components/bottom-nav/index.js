import React, { useState } from "react";

import ExploreIconFill from "../../asset/icons/mui/explore-icon-fill";
import ExploreIconBorder from "../../asset/icons/mui/explore-icon-border";
import SearchIconFill from "../../asset/icons/mui/search-icon-fill";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import BookmarkIconFill from "../../asset/icons/mui/bookmark-icon-fill";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import AccountCircleIconFill from "../../asset/icons/mui/account-circle-icon-fill";
import AccountCircleIconBorder from "../../asset/icons/mui/account-circle-icon-border";

import "./style.scoped.scss";
import { Link } from "react-router-dom";

const BottomNav = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
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
    const makeIcon = ({ icon, path }, index) => {
        const focus = index === currentIndex;
        return (
            <Link to={path} key={index} className="icon-wrapper" onClick={() => setCurrentIndex(index)}>
                <div className={`icon ${focus ? "focus" : ""} ${index === 3 ? "badge" : ""}`}>
                    {icon[focus ? 1 : 0]({ height: "1.5rem", fill: "var(--primary-text-color)" })}
                </div>
            </Link>
        )
    };

    let gradientStyle;
    switch (currentIndex) {
        case 0:
            gradientStyle = `linear-gradient(to right, var(--content-text-color) 12.5%, transparent 37.5%)`;
            break;
        case 1:
            gradientStyle = `linear-gradient(to right, transparent 12.5%, var(--content-text-color) 37.5%, transparent 62.5%)`;
            break;
        case 2:
            gradientStyle = `linear-gradient(to right, transparent 37.5%, var(--content-text-color) 62.5%, transparent 87.5%)`;
            break;
        case 3:
            gradientStyle = `linear-gradient(to right, transparent 62.5%, var(--content-text-color) 87.5%)`;
            break;
    }

    return (
        <nav className="bottom-nav-wrapper">
            <div className="bottom-nav-border" style={{ background: gradientStyle }} />
            <ul className="bottom-nav">
                {iconList.map(makeIcon)}
            </ul>
        </nav>
    );
};

export default BottomNav;