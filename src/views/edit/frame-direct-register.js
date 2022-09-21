import React from "react";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


const FrameDirectRegister = ({ framer }) => {
  return (
    <div className="page">
      <header>
        <div className="header-back-button" onClick={() => framer.prev()}>
          <BackIcon />
        </div>
        <div className="text-button" onClick={() => framer.prev()}>
          <p>확인</p>
        </div>
      </header>
      <main>
        <p>위치가 어디인가요? 마커를 찍어주세요.</p>
        <div id="map" style={{ height: "24rem", }}><h2>지도 화면</h2></div>
        <div className="menu-item">
          <h3>가게 이름</h3>
          <input className="text-box" type="text" placeholder="이모네손칼국수" />
        </div>
        <div className="menu-item">
          <h3>파는 음식</h3>
          <input className="text-box" type="text" placeholder="칼국수, 만두" />
        </div>
      </main>
    </div>
  )
};

export default FrameDirectRegister;