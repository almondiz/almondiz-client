import React from "react";

import "./style.scoped.scss";

import ChatBubbleIconBorder from "../../asset/icons/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/bookmark-icon-border";
import MoreHorizIcon from "../../asset/icons/more-horiz-icon";
import SellIconBorder from "../../asset/icons/sell-icon-border";

import { Link } from "react-router-dom";


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
    return `${minutes}분 전`;
  else if (minutes < 60 * 24)       // 1 ~ 23시간
    return `${Math.floor(minutes / 60)}시간 전`;
  else if (minutes < 60 * 24 * 8)   // 1 ~ 7일
    return `${Math.floor(minutes / (60 * 24))}일 전`;
  
  const date = new Date(epoch);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const generateRandomGrid = (Y, X, TILES) => {
  const map = Array.from(Array(Y), () => Array(X).fill(0));
  const start = new Array(TILES);

  const init = () => {
    let tile;
    let y, x, tmp;
    for (tile = 1; tile <= TILES; tile++) {
      while (true) {
        tmp = Math.floor(Math.random() * (Y * X));
        y = Math.floor(tmp / X), x = tmp % X;
        if (map[y][x]) continue;
        map[y][x] = `grid-${tile}`;
        start[tile] = { y: y, x: x };
        break;
      }
    }
  };
  const shuffleArray = arr => {
    let i, j, tmp;
    for (i = 0; i < arr.length - 1; i++) {
      j = (i + 1) + Math.floor(Math.random() * (arr.length - i - 1));
      tmp = arr[i], arr[i] = arr[j], arr[j] = tmp;
    }
  };
  const expand = tile => {
    let { y, x } = start[tile];
    let y_m = y, y_M = y;
    let x_m = x, x_M = x;

    let order = [ 0, 1, 2, 3 ];
    shuffleArray(order);

    let i, b;
    for (i = 0; i < order.length; i++) {
      switch (order[i]) {
      case 0:     // to +X
        for (x = x_M + 1; x < X; x++) {
          b = true;
          for (y = y_m; y <= y_M; y++)
            if (map[y][x]) {
              b = false;
              break;
            }
          if (!b) break;
          for (y = y_m; y <= y_M; y++)    map[y][x] = `grid-${tile}`;
          x_M = x;
        }
        break;
      case 1:     // to +Y
        for (y = y_M + 1; y < Y; y++) {
          b = true;
          for (x = x_m; x <= x_M; x++)
            if (map[y][x]) {
              b = false;
              break;
            }
          if (!b) break;
          for (x = x_m; x <= x_M; x++)    map[y][x] = `grid-${tile}`;
          y_M = y;
        }
        break;
      case 2:     // to -X
        for (x = x_m - 1; x >= 0; x--) {
          b = true;
          for (y = y_m; y <= y_M; y++)
            if (map[y][x]) {
              b = false;
              break;
            }
          if (!b) break;
          for (y = y_m; y <= y_M; y++)    map[y][x] = `grid-${tile}`;
          x_m = x;
        }
        break;
      case 3:     // to -Y
        for (y = y_m - 1; y >= 0; y--) {
          b = true;
          for (x = x_m; x <= x_M; x++)
            if (map[y][x]) {
              b = false;
              break;
            }
          if (!b) break;
          for (x = x_m; x <= x_M; x++)    map[y][x] = `grid-${tile}`;
          y_m = y;
        }
        break;
      }
    }
  };
  const toString = () => {
    let s = ``;
    let y, x;
    for (y = 0; y < Y; y++) {
      s += `"`;
      for (x = 0; x < X; x++)
        s += map[y][x] + " ";
      s += `"\n`;
    }
    return s;
  };

  init();
  let tile;
  for (tile = 1; tile <= TILES; tile++)   expand(tile);
  return toString();
};

const PostItem = ({ index, post, user }) => {
  const makeTags = (tag, index) => (<li className="tag" key={index}>{tag}</li>);
  
  const makeImageGrid = (src, index) => (<div key={index} style={{ gridArea: `grid-${index + 1}` , backgroundImage: `url(${src})` }} />);

  const makeImageGridStyle = () => {
    let N = Math.max(2, Math.round(post.content.images.length * 1.5 / 3));
    let M = 3;

    const ImageGridStyle = {
      gridTemplateRows: `repeat(${N} 1fr)`,
      gridTemplateColumns: `repeat(${M}, 1fr)`,
      height: `${8 * N}rem`,
      gridTemplateAreas: generateRandomGrid(N, M, post.content.images.length),
    };
    console.log(ImageGridStyle.gridTemplateAreas)
    return ImageGridStyle;
  };

  return (
    <article className="post-item">
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
          <div className="image-grid" style={makeImageGridStyle()}>{post.content.images.map(makeImageGrid)}</div>
        </div>
      </main>

      <footer className="footer">
        <p className="counts">{`댓글 ${post.reaction.commentCount} · 스크랩 ${post.reaction.scrapCount}`}</p>
        <div className="comment">
          <img className="thumb" alt="comment" src={post.reaction.comments[0].profile.thumb} />
          <p>{post.reaction.comments[0].content}</p>
        </div>
      </footer>
    </article>
  );
}

export default PostItem;