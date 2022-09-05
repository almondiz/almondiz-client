import React, { useState } from "react";

import "./style.scoped.scss";

import ChatBubbleIconBorder from "../../asset/icons/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/bookmark-icon-border";
import ShareIconBorder from "../../asset/icons/share-icon-border";

import ImageIndicator from "../image-indicator";


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

const FeedItem = ({ post, user }) => {
  return (
    <article className="feed-item">
      <header>
        <div className="profile">
          <img className="thumb" alt="profile" src={post.profile.thumb}/>
          <div className="text-wrap">
            <p className="name">{post.profile.name}</p>
            <p className="date">5분 전 · 근처</p>
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

      <main>
        <div className="text">{post.content.text}</div>
        <ImageIndicator className="images" images={post.content.images} />
      </main>

      <footer>
        <div className="buttons">
          <div className="button-wrap">
            <ChatBubbleIconBorder alt="comment" height="1.5rem" fill="var(--primary-text-color)" />
            <p>{post.reaction.commentCount}</p>
          </div>
          <ShareIconBorder alt="share" height="1.5rem" fill="var(--primary-text-color)" />

          <div className="button-wrap right">
            <BookmarkIconBorder alt="scrap" height={"1.5rem"} fill={"var(--primary-text-color)"} />
            <p>{post.reaction.scrapCount}</p>
          </div>
        </div>
        <div className="comment">
          <img alt="thumb" src={post.reaction.comments[0].profile.thumb} />
          <p>{post.reaction.comments[0].content}</p>
        </div>
      </footer>
    </article>
  );
}

export default FeedItem;