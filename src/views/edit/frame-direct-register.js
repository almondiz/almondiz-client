import React from "react";
import { useNavigate } from "react-router-dom";

import NaverMapElement from "../../components/naver-map-element";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


// frame 3
const FrameDirectRegister = ({ framer }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => framer.prev()}>
          <BackIcon />
        </button>
        <h3 className="title">리뷰 작성</h3>
        <button className="button-next" onClick={() => framer.walk(-2)}>
          확인
        </button>
      </nav>

      <main className="content">
        <section className="map-view">
          <p>위치가 어디인가요? 마커를 찍어주세요.</p>

          <div className="map-container">
            <NaverMapElement id="map-init-shop" />
          </div>

          <div className="menu-item">
            <h3>가게 이름</h3>
            <input className="text-box" type="text" placeholder="이모네손칼국수" />
          </div>
          <div className="menu-item">
            <h3>파는 음식</h3>
            <input className="text-box" type="text" placeholder="칼국수, 만두" />
          </div>
        </section>
      </main>
    </>
  )
};

export default FrameDirectRegister;