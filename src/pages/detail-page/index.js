import React from "react";

//import "./style.scoped.scss";

//import FeedContent from "../../components/feed-content";

//import IconImg from "../../asset/logo/symbol.png";

import "./style.scoped.scss";

import FooImage from "../../asset/logo/symbol.png";

import BottomNav from '../../components/bottom-nav';

const DetailPage = () => {
  return (
    <main>
      <div className="article-header">
        <div className="profile">
          <img className="profile-img" alt="profile" src={FooImage} />
          <div className="profile-text">
            <p className="id">닭발 피스타치오</p>
            <p className="date">5분 전 · 근처</p>
          </div>
        </div>
        <div className="store">
          <div className="store-title">
            <img className="thumb" alt="storeImage" src={FooImage} />
            <p className="name">팔달수제맥주</p>
          </div>
          <p className="store-location">수원 영통구 원천동 · 3km</p>
        </div>
      </div>

      <div className="article-body">
        <p>아주대 근처에 있는 팔달수제맥주.</p>
        <br />
        <p>테이블 3~4개 있는 조그만 가게. 주방이랑 손님석 구분이 없어서 신기.</p>
        <p>다음에 또 와야겠다.</p>
        <div className="photo">
          <img src="https://picsum.photos/200/300" />
        </div>
        <div className="photo">
          <img src="https://picsum.photos/200/300" />
        </div>
        <div className="photo">
          <img src="https://picsum.photos/200/300" />
        </div>
      </div>

      <div className="floating-footer">
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
      </div>
      <BottomNav />
    </main>
  );
}

export default DetailPage;