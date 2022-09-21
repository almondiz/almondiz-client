import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ImageGrid from "../image-grid";

import "./style.scoped.scss";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";
import FavoriteIconBorder from "../../asset/icons/mui/favorite-icon-border";


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


const PostItem = ({ index, post, me, setImageViewerIndex }) => {
  const navigate = useNavigate();

  const location = useSelector(state => state.global.location);

  const makeTags = (tag, index) => (<li className="tag" key={index}>{tag.tagName}</li>);
  const makeComments = (comment, index) => {
    return (
      <article key={index} className={`comment-item ${comment.reply ? "" : "reply"}`}>
        <header className="header">
          <div
            className={`profile ${comment.userId === me.profile.uid ? "me" : (comment.isFollowed ? "follower" : "")} ${comment.userId === post.profileId ? "writer" : ""}`}
            onClick={() => navigate(`/profile/${comment.userId}`)}
          >
            <div className="thumb" alt="profile" style={{ backgroundColor: comment.background }}>{comment.emoji ? comment.emoji : ""}</div>
            <p className="name">{comment.userId === me.profile.uid ? "나" : comment[comment.isFollowed ? "alias" : "nickName"]}</p>
          </div>
          <p className="date">{getTime(comment.createdAt)}</p>
          <div className="icon more-icon">
            <MoreHorizIcon height="1.25rem" fill="#666" />
          </div>
          <button className="button-favorite right">
            <FavoriteIconBorder height="1.25rem" fill="#666" />
            <p>{comment.likeCount}</p>
          </button>
        </header>
        <p className="body">{comment.text}</p>
  
        {
          comment.reply && (
            <section className="comment-list reply">
              {comment.reply.map(makeComments)}
            </section>
          )
        }
      </article>
    );
  };

  return (
    <article className="post-item">
      <header className="header">
        <a
          className={`profile ${post.profileId === me.profile.uid ? "me" : (post.isFollowed ? "follower" : "")}`}
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
            <div className="thumb" alt="shop" style={{ backgroundColor: post.userProfileBackground }}>{post.userProfileEmoji ? post.userProfileEmoji : ""}</div>
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
        <div className="images">
          <ImageGrid images={post.postFileImgUrls} shop={{
            name: post.storeName,
            thumb: post.shopThumb,
            address: post.storeAddress,
          }} action={setImageViewerIndex} />
        </div>

        <div className="images">
          
        </div>
      </main>

      <footer className="footer">
        <p className="counts">{`댓글 ${post.commentCount} · 스크랩 ${post.scrapCount}`}</p>
        <section className="comment-list">
          {post.commentList.map(makeComments)}
        </section>
      </footer>
    </article>
  );
}

export default PostItem;