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
        <text className="feed-description-text">아주대 근처에 있는 팔달수제맥주.
        
        테이블 3~4개 있는 조그만 가게. 주방이랑 손님석 구분이 없어서 신기
        ...
        </text>
      </div>
      <div className="feed-card"></div>
      <div className="feed-bottom">
        <div className="feed-bottom-buttons">
          <div className="feed-bottom-buttons-wrap">
            <img className="feed-bottom-buttons-icon" alt="comment" src={FooImage} />
            <p>1</p>
          </div>
          <img className="feed-bottom-buttons-icon" alt="share" src={FooImage} />
          <div className="feed-bottom-buttons-wrap right">
            <img className="feed-bottom-buttons-icon" alt="scrap" src={FooImage} />
            <p>1</p>
          </div>
        </div>
        <div className="feed-bottom-comment">
          <img alt="comment-profile" src={FooImage} />
          <p>나만의 작은 가게였는데 글 내려주세요.</p>
        </div>
      </div>
    </main>
  );
}

export default FeedContent;