import React from "react";
import { useNavigate } from "react-router-dom";

import NaverMapElement from "../../components/naver-map-element";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import LocationSearchingIcon from "../../asset/icons/mui/location-searching-icon";


// frame 2
const FrameFindShop = ({ framer }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => framer.prev()}>
          <BackIcon />
        </button>
        <h3 className="title">리뷰 작성</h3>
        <button className="button-next" onClick={() => framer.prev()}>
          확인
        </button>
      </nav>

      <main className="content">
        <section className="map-view">
          <div className="textfield">
            <div className="textfield-icon"><SearchIconBorder /></div>
            <input className="textfield-box" type="text" placeholder="점포를 검색하세요" autoFocus />
            <button className="textfield-cancel-button"><CancelIconFill /></button>
          </div>

          <div className="map-container">
            <NaverMapElement id="map-find-shop" />
          </div>

          <div className="menu-item">
            <h3>원하는 점포 결과가 없으신가요?</h3>
            <button className="text-button" onClick={() => framer.next()}>직접 등록</button>
          </div>          
        </section>
      </main>

      <aside className="float">
        <footer className="footer" style={{ bottom: "5rem" }}>
          <section className="frame-main">
            <button className="button-scrap icon-sm right">
              <LocationSearchingIcon />
            </button>
          </section>
        </footer>
      </aside>
    </>
  )
};

export default FrameFindShop;