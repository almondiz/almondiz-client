import React from "react";

import "./style.scoped.scss";

import IconImg from "../../asset/logo/symbol.png";
import BackIcon from "../../asset/icons/back-icon";

const Tagger = ({ moveStep }) => {
  return (
    <div className="page-wrap">
      <header>
        <div className="header-back-button" onClick={moveStep(-1)}>
          <BackIcon height="1.5rem" fill="var(--primary-text-color)" />
        </div>
        <div className="header-next-button">
          완료
        </div>
        리뷰 작성
      </header>
      <main>
        <div className="menu-item">
          <h3>점포</h3>
          <div className="text-button" onClick={moveStep(1)}>
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
}

export default Tagger;