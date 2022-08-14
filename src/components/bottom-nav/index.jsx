import React, { useState } from "react";

import FeedIcon from "../../asset/icons/feed-icon";
//import SearchIcon from "../../asset/icons/search-icon";
//import ScrappedIcon from "../../asset/icons/scrapped-icon";
//import ProfileIcon from "../../asset/icons/profile-icon";

import "./style.css";

const ButtomNav = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const iconList = [
        FeedIcon,
        FeedIcon,
        FeedIcon,
        FeedIcon,
    ];
    const makeIcon = (component, index) => {
        return (
            <li className={`icon ${index == currentIndex ? "focus" : ""}`} onClick={() => setCurrentIndex(index)}>
                {component()}
            </li>
        )
    };
    return (
        <ul className="buttom-nav">
            {iconList.map(makeIcon)}
        </ul>
    );
};

export default ButtomNav;