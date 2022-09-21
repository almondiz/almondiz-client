import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ImageSlider from "../image-slider";

import "./style.scoped.scss";
import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";


const getDistance = (location_1, location_2) => {  // generally used geo measurement function
  let R = 6378.137; // Radius of earth in KM
  let dLat = (location_2.lat - location_1.lat) * Math.PI / 180;
  let dLng = (location_2.lng - location_1.lng) * Math.PI / 180;
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(location_1.lat * Math.PI / 180) * Math.cos(location_2.lat * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return Math.round(d); // KM
};
const getTime = epoch => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;

  const now = new Date();

  const dt = Math.floor(now.valueOf() - epoch);
  if (dt < MINUTE)
    return `방금`;
  else if (dt < HOUR)   // 1 ~ 59 mins
    return `${Math.floor(dt / MINUTE)}분 전`;
  else if (dt < DAY)    // 1 ~ 23 hours
    return `${Math.floor(dt / HOUR)}시간 전`;
  else if (dt < WEEK)   // 1 ~ 7 days
    return `${Math.floor(dt / DAY)}일 전`;
  
  const date = new Date(epoch);
  return (date.getFullYear() !== now.getFullYear() ? `${date.getFullYear()}년 ` : ``) + `${date.getMonth() + 1}월 ${date.getDate()}일`;
};


const CardItem = ({ index, post, me }) => {
  const navigate = useNavigate();

  const location = useSelector(state => state.global.location);

  const makeTags = (tag, index) => (<li className="tag" key={index}>{tag.tagName}</li>);

  return (
    <article className="card-item">
      <div className="link" onClick={() => navigate(`/post`)} />

      <header className="header">
        <a
          // isFollowed 미구현상태
          className={`profile ${post.profileId === me.profile.uid ? "me" : (post.isFollowed ? "follower" : "")}`}
          // 이부분은 따로 구현이 필요
          // href={post.shop.link}
          href={"/feed"}
        >
          <img className="thumb" alt="profile" src={post.shopThumb} />
          <div className="text-wrap">
            <p className="name">{post.storeName}</p>
            <p className="date">{post.storeAddress} · {getDistance(location, {
              lat: post.lati,
              lng: post.longi,
            })}km</p>
          </div>
        </a>
        <div className="shop" onClick={() => navigate(`/profile/${post.profileId}`)}>
          <div className="shop-icon">
            <div className="thumb" alt="shop" style={{ backgroundColor: post.userProfileBackground }}>
              {post.userProfileEmoji}
            </div>
            <p className="name">{post.profileId === me.profile.uid ? "나" : post[post.isFollowed ? "alias" : "nickName"]}</p>
          </div>
          <p className="location">{getTime(post.createdAt)}{post.profileId === me.profile.uid ? "" : ` · ${post.isFollowed ? "구독" : "근처"}`}</p>
        </div>
      </header>

      <nav className="tags-wrap">
        <SellIconBorder height="1.25rem" fill="#999" />
        <ul className="tags">{post.tagList.map(makeTags)}</ul>
      </nav>

      <main className="body">
        <p className="text">{post.content}</p>
        <div className="images" onClick={() => navigate(`/post`)}>
          <ImageSlider images={post.postFileImgUrls} />
        </div>
      </main>

      <footer className="footer">
        <div className="buttons">
          <button className="button">
            <div className="icon-sm">
              <ChatBubbleIconBorder />
            </div>
            <p>{post.commentCount}</p>
          </button>
          <button className="button right">
            <div className="icon-sm icon-container">
              <MoreHorizIcon />
            </div>
          </button>
          <button className="button">
            <div className="icon-sm">
              <BookmarkIconBorder />
            </div>
            <p>{post.scrapCount}</p>
          </button>
        </div>
        {
          post.commentCount > 0 && (
            <div className="comment">
              <div className="thumb" alt="profile" style={{ backgroundColor: post.commentList[0].background }}>{post.commentList[0].emoji}</div>
              <p>{post.commentList[0].text}</p>
            </div>
          )
        }
      </footer>
    </article>
  );
}

export default CardItem;