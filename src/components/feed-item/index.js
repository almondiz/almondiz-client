import React from "react";

import "./style.scoped.scss";

import ChatBubbleIconBorder from "../../asset/icons/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/bookmark-icon-border";
import MoreHorizIcon from "../../asset/icons/more-horiz-icon";
import SellIconBorder from "../../asset/icons/sell-icon-border";

import ImageSlider from "../image-slider";


const getDistance = (location_1, location_2) => {  // generally used geo measurement function
  let R = 6378.137; // Radius of earth in KM
  let dLat = (location_2.lat - location_1.lat) * Math.PI / 180;
  let dLng = (location_2.lng - location_1.lng) * Math.PI / 180;
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(location_1.lat * Math.PI / 180) * Math.cos(location_2.lat * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return Math.round(d); // kilometers
};

const getTime = epoch => {
  const now = new Date().valueOf();

  let minutes = Math.floor((now - epoch) / (1000 * 60));
  if (minutes < 1)
    return `방금`;
  else if (minutes < 60)            // 1 ~ 59분
    return `${minutes} 분 전`;
  else if (minutes < 60 * 24)       // 1 ~ 23시간
    return `${Math.floor(minutes / 60)}시간 전`;
  else if (minutes < 60 * 24 * 8)   // 1 ~ 7일
    return `${Math.floor(minutes / (60 * 24))}일 전`;
  
  const date = new Date(epoch);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const FeedItem = ({ post, user }) => {
  const makeTags = (tag, index) => (<li className="tag" key={index}>{tag}</li>)

  return (
    <article className="feed-item">
      <header className="header">
        <div className="profile">
          <img className="thumb" alt="profile" src={post.profile.thumb}/>
          <div className="text-wrap">
            <p className={`name ${post.profile.isFollower ? "follower" : ""}`}>{post.profile.name}</p>
            <p className="date">{getTime(post.createdAt)} · {post.profile.isFollower ? "팔로잉" : "근처"}</p>
          </div>
        </div>
        <div className="shop">
          <div className="shop-icon">
            <img className="thumb" alt="shop" src={post.shop.thumb} />
            <p className="name">{post.shop.name}</p>
          </div>
          <p className="location">{post.shop.location.address} · {getDistance(user.location, post.shop.location)}km</p>
        </div>
      </header>

      <nav className="tags-wrap">
        <SellIconBorder height="1.25rem" fill="#999" />
        <ul className="tags">{post.tags.map(makeTags)}</ul>
      </nav>

      <main className="content">
        <div className="text">{post.content.text}</div>
        <div className="images">
          <ImageSlider images={post.content.images} />
        </div>
      </main>

      <footer className="footer">
        <div className="buttons">
          <div className="button-wrap">
            <ChatBubbleIconBorder alt="comment" height="1.5rem" fill="var(--primary-text-color)" />
            <p>{post.reaction.commentCount}</p>
          </div>
          <div className="button-wrap right">
            <MoreHorizIcon alt="more" height="1.5rem" fill="var(--primary-text-color)" />
          </div>
          <div className="button-wrap right">
            <BookmarkIconBorder alt="scrap" height={"1.5rem"} fill={"var(--primary-text-color)"} />
            <p>{post.reaction.scrapCount}</p>
          </div>
        </div>
        <div className="comment">
          <img className="thumb" alt="comment" src={post.reaction.comments[0].profile.thumb} />
          <p>{post.reaction.comments[0].content}</p>
        </div>
      </footer>
    </article>
  );
}

export default FeedItem;