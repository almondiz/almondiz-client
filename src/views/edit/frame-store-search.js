import React from "react";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


// frame 3
const FrameStoreSearch = ({ framer }) => {
  return (
    <div className="page">
      <header>
        <button className="header-back-button" onClick={() => framer.prev()}>
          <BackIcon />
        </button>
        <input className="text-box" type="text" placeholder="장소 검색"/>
      </header>
      <main>
        <div id="map"><h2>지도 화면</h2></div>
        <div className="menu-item">
          <h3>원하는 점포 결과가 없으신가요?</h3>
          <div className="text-button" onClick={() => framer.next()}>
            <p>직접 등록</p>
          </div>
        </div>
      </main>
    </div>
  )
};

export default FrameStoreSearch;