import React from "react";

import "./style.scoped.scss";

import IconImg from "../../asset/logo/symbol.png";
import BackIcon from "../../asset/icons/back-icon";

const Writer = ({ moveStep }) => {
  return (
    <div className="page-wrapper">
      <header>
        <div className="header-back-button">
          <BackIcon height="1.5rem" fill="var(--background-color)" />
        </div>
        <div className="header-next-button" onClick={moveStep(1)}>
          다음
        </div>
        리뷰 작성
      </header>
      <main>
        <textarea id="texts" name="texts" autoFocus />
      </main>
      <aside id="thumbs">
        <div className="thumb thumb-add-button">
          <p>사진 추가</p>
          <p>4/10</p>
        </div>
        <div className="thumb" style={{backgroundImage: "url(https://picsum.photos/200/200)"}} />
        <div className="thumb" style={{backgroundImage: "url(https://picsum.photos/200/200)"}} />
        <div className="thumb" style={{backgroundImage: "url(https://picsum.photos/200/200)"}} />
        <div className="thumb" style={{backgroundImage: "url(https://picsum.photos/200/200)"}} />
      </aside>
    </div>
  )
}

export default Writer;