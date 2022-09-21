import React from "react";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


const FrameTagger = ({ framer }) => {
  return (
    <div className="page">
      <header>
        <div className="header-back-button" onClick={() => framer.prev()}>
          <BackIcon />
        </div>
        <div className="header-next-button">
          완료
        </div>
        리뷰 작성
      </header>
      <main>
        <div className="menu-item">
          <h3>점포</h3>
          <div className="text-button" onClick={() => framer.next()}>
            <p>선택</p>
          </div>
        </div>
        <div className="menu-item">
          <h3>태그</h3>
          <input className="text-box" type="text" placeholder="태그 추가" />
        </div>
      </main>
    </div>
  )
};

export default FrameTagger;