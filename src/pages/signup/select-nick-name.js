import React from "react";

import "./style.scoped.scss";

import FooImage from "../../asset/logo/symbol.png";
import HeaderBeforeIcon from "../../asset/icons/header-before-icon-stroke";
import ProfileRefreshIcon from "../../asset/icons/profile-refresh-icon-stroke";

const SelectNickName = ({ moveStep }) => {
  return (
    <>
      <div className="header">
        <div className="header-before-icon" onClick={moveStep(-1)}>
          <HeaderBeforeIcon color="white" />
        </div>
        <p>프로필 생성</p>
      </div>
      <div className="contents">
        <div className="contents-profile">
          <img className="contents-profile-img" alt="profile" src={FooImage}/>
          <div className="contents-profile-icon point-background">
            <ProfileRefreshIcon/>
          </div>
          <p>프로필 사진</p>
        </div>
        <div className="contents-select">
          <input className="contents-select-input" placeholder="좋아하는 음식"/>
          <select className="contents-select-box">
            <option value={""}>견과류 선택</option>
            <option value={0}>호두</option>
            <option value={1}>피스타치오</option>
          </select>
        </div>
        <button className="contents-button point-background" onClick={moveStep(1)}><p>다음</p></button>
      </div>
    </>
  );
}

export default SelectNickName;