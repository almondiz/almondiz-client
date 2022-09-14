import React from "react";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


const Writer = ({ moveStep }) => {
  return (
    <div className="page-wrap">
      <header>
        <div className="header-back-button">
          <BackIcon />
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
        <div className="thumb" style={{ backgroundImage: "url(https://picsum.photos/id/210/200)" }} />
        <div className="thumb" style={{ backgroundImage: "url(https://picsum.photos/id/220/200)" }} />
        <div className="thumb" style={{ backgroundImage: "url(https://picsum.photos/id/230/200)" }} />
        <div className="thumb" style={{ backgroundImage: "url(https://picsum.photos/id/210/240)" }} />
      </aside>
    </div>
  )
};

export default Writer;