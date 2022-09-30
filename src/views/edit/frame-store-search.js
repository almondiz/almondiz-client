import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


// frame 2
const FrameStoreSearch = ({ framer }) => {
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
        <input className="text-box" type="text" placeholder="장소 검색" autoFocus />

        <div id="map"><h2>지도 화면</h2></div>
        <div className="menu-item">
          <h3>원하는 점포 결과가 없으신가요?</h3>
          <button className="text-button" onClick={() => framer.next()}>직접 등록</button>
        </div>
      </main>
    </>
  )
};

export default FrameStoreSearch;