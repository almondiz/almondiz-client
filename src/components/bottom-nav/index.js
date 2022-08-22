import React, { useState } from "react";

import ExploreIconFill from "../../asset/icons/explore-icon-fill";
import ExploreIconBorder from "../../asset/icons/explore-icon-border";
import SearchIconFill from "../../asset/icons/search-icon-fill";
import SearchIconBorder from "../../asset/icons/search-icon-border";
import BookmarkIconFill from "../../asset/icons/bookmark-icon-fill";
import BookmarkIconBorder from "../../asset/icons/bookmark-icon-border";
import AccountCircleIconFill from "../../asset/icons/account-circle-icon-fill";
import AccountCircleIconBorder from "../../asset/icons/account-circle-icon-border";

import "./style.scoped.scss";

const ButtomNav = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const iconList = [
        [ExploreIconBorder, ExploreIconFill],
        [SearchIconBorder, SearchIconFill],
        [BookmarkIconBorder, BookmarkIconFill],
        [AccountCircleIconBorder, AccountCircleIconFill],
    ];
    const makeIcon = (component, index) => {
        const focus = index === currentIndex;
        return (
            <li key={index} className="icon-wrapper" onClick={() => setCurrentIndex(index)}>
                <div className={`icon ${focus ? "focus" : ""}`}>
                    {component[focus ? 1 : 0]()}
                </div>
            </li>
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
        <nav className="buttom-nav-wrapper">
            <div className="buttom-nav-border" style={{ background: gradientStyle }} />
            <ul className="buttom-nav">
                {iconList.map(makeIcon)}
            </ul>
        </nav>
    );
};

export default ButtomNav;