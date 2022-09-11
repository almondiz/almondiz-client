import React from "react";

import "./style.scoped.scss";

import ChatBubbleIconBorder from "../../asset/icons/mui/chat-bubble-icon-border";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";
import FavoriteIconBorder from "../../asset/icons/mui/favorite-icon-border";


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
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;

  const now = new Date().valueOf();

  const dt = Math.floor(now - epoch);
  if (dt < MINUTE)
    return `방금`;
  else if (dt < HOUR)            // 1 ~ 59분
    return `${Math.floor(dt / MINUTE)}분 전`;
  else if (dt < DAY)       // 1 ~ 23시간
    return `${Math.floor(dt / HOUR)}시간 전`;
  else if (dt < WEEK)   // 1 ~ 7일
    return `${Math.floor(dt / DAY)}일 전`;
  
  const date = new Date(epoch);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const generateRandomGrid = (Y, X, TILES) => {
  let ret;

  while (true) {
    const map = Array.from(Array(Y), () => Array(X).fill(0));
    const seed = new Array(TILES + 1);

    const _plant = () => {
      map[Y - 1][X - 2] = map[Y - 1][X - 1] = -TILES, seed[TILES] = { y: Y - 1, x: X - 2 };   // for shop-link

      let tile;
      let y, x, tmp;
      for (tile = 1; tile <= TILES - 1; tile++) {
        while (true) {
          tmp = Math.floor(Math.random() * (Y * X));
          y = Math.floor(tmp / X), x = tmp % X;
          if (map[y][x]) continue;
          map[y][x] = -tile, seed[tile] = { y: y, x: x };
          break;
        }
      }
    };
    const _shuffleArray = arr => {
      let i, j, tmp;
      for (i = 0; i < arr.length - 1; i++) {
        j = (i + 1) + Math.floor(Math.random() * (arr.length - i - 1));
        tmp = arr[i], arr[i] = arr[j], arr[j] = tmp;
      }
    };
    const _grow = tile => {
      let { y, x } = seed[tile];
      let y_m = y, y_M = y;
      let x_m = x, x_M = x;
      if (tile === TILES)   x_M = x + 1;

      let order = [ 0, 1, 2, 3 ];
      _shuffleArray(order);

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
            for (y = y_m; y <= y_M; y++)    map[y][x] = -tile;
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
            for (x = x_m; x <= x_M; x++)    map[y][x] = -tile;
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
            for (y = y_m; y <= y_M; y++)    map[y][x] = -tile;
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
            for (x = x_m; x <= x_M; x++)    map[y][x] = -tile;
            y_m = y;
          }
          break;
        }
      }

      if (tile === TILES) {
        for (x = x_m; x <= x_M; x++)
          for (y = y_m; y <= y_M; y++)
            if (map[y][x] !== -tile)
              map[y][x];
      }
    };
    const _isFullGrown = () => {
      let x, y;
      if (tile === TILES)
        for (x = 0; x < X; x++)
          for (y = 0; y < Y; y++)
            if (map[y][x] === 0)
              return false;
      return true;
    };
    const _sort = () => {
      let new_tile = 1, tile;
      let y, x, y1, x1;
      for (y = 0; y < Y; y++) {
        for (x = 0; x < X; x++) {
          if ((tile = map[y][x]) < 0) {
            if (tile === -TILES) {    // for shop-link
              map[y][x] *= -1;
              continue;
            }

            for (y1 = y; y1 < Y; y1++) {
              if (map[y1][x] !== tile)   break;
              map[y1][x] = new_tile;
              for (x1 = x + 1; x1 < X; x1++) {
                if (map[y1][x1] !== tile)  break;
                map[y1][x1] = new_tile;
              }
            }
            new_tile++;
            if (x1 < X)   x = x1 - 1;
          }
        }
      }
    };
    const _draw = (prefix="") => {
      let s = ``;
      let y, x;
      for (y = 0; y < Y; y++) {
        s += `"`;
        for (x = 0; x < X; x++)
          s += `${prefix}${map[y][x]} `;
        s += `"\n`;
      }
      return s;
    };

    _plant();
    let tile;
    for (tile = 1; tile <= TILES; tile++)   _grow(tile);
    if (_isFullGrown()) {
      _sort();
      ret = _draw("grid-");
      break;
    }
  }
  //console.log(ret);
  return ret;
};


const makeCommentItem = (comment, index) => (<CommentItem key={index} commentIndex={index} comment={comment} />);
const CommentItem = ({ commentIndex, comment }) => {
  return (
    <article className={`comment-item ${comment.reply ? "" : "reply"}`}>
      <header className="header">
        <img className="thumb" alt="profile" src={comment.profile.thumb} />
        <p className={`name ${comment.profile.isFollower ? "follower" : ""}`}>{comment.profile.name}</p>
        <p className="date">{getTime(comment.createdAt)}</p>
        <div className="icon more-icon">
          <MoreHorizIcon height="1.25rem" fill="#666" />
        </div>
        <button className="button-favorite right">
          <FavoriteIconBorder height="1.25rem" fill="#666" />
          <p>{comment.likeCount}</p>
        </button>
      </header>
      <p className="body">{comment.content}</p>

      {
        comment.reply && (
          <section className="comment-list reply">
            {comment.reply.map(makeCommentItem)}
          </section>
        )
      }
    </article>
  );
};

const PostItem = ({ index, post, user, setShownImageIndex }) => {
  const makeTags = (tag, index) => (<li className="tag" key={index}>{tag}</li>);
  
  const makeImageGrid = (src, index) => (
    <div
      key={index}
      className="grid image"
      style={{ gridArea: `grid-${index + 1}`, backgroundImage: `url(${src})` }}
      onClick={() => setShownImageIndex(index)}
    />
  );

  const makeImageGridStyle = () => {
    let N = Math.round(post.content.images.length / 2) + 1;   // # of rows
    let M = 3;                                                // # of columns
    let TILES = post.content.images.length + 1;               // # of tiles (including a shop link tile)

    const ImageGridStyle = {
      gridTemplateRows: `repeat(${N}, 1fr)`,
      gridTemplateColumns: `repeat(${M}, 1fr)`,
      height: `${8 * N}rem`,
      gridTemplateAreas: generateRandomGrid(N, M, TILES),
    };
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

      <main className="body">
        <p className="text">{post.content.text}</p>
        <div className="images">
          <div className="image-grid" style={makeImageGridStyle()}>
            {post.content.images.map(makeImageGrid)}
            <div className="grid shop-link" style={{ gridArea: `grid-${post.content.images.length + 1}` }}>
              <div className="content">
                <div>
                  <p className="name">{post.shop.name}</p>
                  <p className="address">{post.shop.location.address}</p>
                </div>
                <NavigateNextIcon height="2.5rem" fill="#fff" />
              </div>
              <div className="image" style={{ backgroundImage: `url(${post.shop.thumb})` }} />
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p className="counts">{`댓글 ${post.reaction.commentCount} · 스크랩 ${post.reaction.scrapCount}`}</p>
        <section className="comment-list">
          {post.reaction.comments.map(makeCommentItem)}
        </section>
      </footer>
    </article>
  );
}

export default PostItem;