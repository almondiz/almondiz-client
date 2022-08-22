import React, { useState } from "react";

import "./style.scoped.scss";

import FooImage from "../../asset/logo/symbol.png";

const FeedContent = ({ post }) => {
  return (
    <main>
      <div className="feed-head">
        <div className="feed-head-profile">
          <img className="feed-head-profile-img" alt="profile" src={FooImage}/>
          <div className="feed-head-profile-wrap">
            <p className="feed-head-profile-wrap-nickname">닭발 피스타치오</p>
            <p className="feed-head-profile-wrap-info">5분 전 · 근처</p>
          </div>
        </div>
        <div className="feed-head-store">
          <div className="feed-head-store-wrap">
            <img className="feed-head-store-wrap-img" alt="storeImage" src={FooImage} />
            <p className="feed-head-store-wrap-name">팔달수제맥주</p>
          </div>
          <p className="feed-head-store-location">수원 영통구 원천동 · 3km</p>
        </div>
      </div>
      <div className="feed-description">
        <text className="feed-description-text">Feed 입니다.</text>
      </div>
      <div className="feed-card"></div>
      <div className="feed-bottom"></div>
    </main>
  );
}

export default FeedContent;