import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


// frame 1
const FrameTagger = ({ framer }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <h3 className="title">리뷰 작성</h3>
        <button className="button-next" onClick={() => framer.walk(3)}>
          다음
        </button>
      </nav>

      <main className="content">
        <div className="menu-item">
          <h3>점포</h3>
          <button className="text-button" onClick={() => framer.next()}>선택</button>
        </div>
        <div className="menu-item">
          <h3>태그</h3>
          <input className="text-box" type="text" placeholder="태그 추가" />
        </div>
      </main>
    </>
  )
};

export default FrameTagger;