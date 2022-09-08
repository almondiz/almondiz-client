import React from "react";

import "./style.scoped.scss";

import IconImg from "../../asset/logo/symbol.png";
import BackIcon from "../../asset/icons/back-icon";

const StoreSearch = ({ moveStep }) => {
  return (
    <div className="page-wrap">
      <header>
        <div className="header-back-button" onClick={moveStep(-1)}>
          <BackIcon height="1.5rem" fill="var(--primary-text-color)" />
        </div>
        <input className="text-box" type="text" placeholder="장소 검색"/>
      </header>
      <main>
        <div id="map"><h2>지도 화면</h2></div>
        <div className="menu-item">
          <h3>원하는 점포 결과가 없으신가요?</h3>
          <div className="text-button" onClick={moveStep(1)}>
            <p>직접 등록</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StoreSearch;