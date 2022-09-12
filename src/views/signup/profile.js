import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";
import RefreshIcon from "../../asset/icons/mui/refresh-icon";
import EmojiImage from "../../asset/dummy/grinning-face_1f600.png";
import EmojiImage_1 from "../../asset/dummy/alien-monster_1f47e.png";
import EmojiImage_2 from "../../asset/dummy/see-no-evil-monkey_1f648.png";

import ArrowDropDownIcon from "../../asset/icons/mui/arrow-drop-down-icon";


const ProfileFrame = ({ moveFrame }) => {
  const navigate = useNavigate();

  return (
    <div className="frame-profile">
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => !moveFrame(-1) && navigate(`/login`)}>
          <BackIcon />
        </button>
        <h3 className="title">프로필 생성</h3>
      </nav>
      
      <main className="content">
        <div className="menu-thumb">
          <div className="thumb candidate" style={{ backgroundImage: `url(${EmojiImage_2})`, backgroundColor: "#cfd8dc" }} />
          <div className="thumb candidate" style={{ backgroundImage: `url(${EmojiImage_1})`, backgroundColor: "#b2dfdb" }} />
          <div className="thumb" style={{ backgroundImage: `url(${EmojiImage})`, backgroundColor: "#e1bee7" }}>
            <div className="refresh-icon">
              <RefreshIcon />
            </div>
          </div>
          <h5 className="description">프로필 이미지</h5>
        </div>
        <div className="menu-name">
          <div className="name">
            <div className="name-first">
              <input className="field" placeholder="좋아하는 음식" />
            </div>
            <div className="name-last">
              <select className="field" defaultValue="default">
                <option value="default" disabled>견과류</option>
                <option value={0}>호두</option>
                <option value={1}>피스타치오</option>
                <option value={2}>캐슈넛</option>
                <option value={3}>땅콩</option>
                <option value={4}>마카다미아</option>
                <option value={5}>아몬드</option>
                <option value={6}>밤</option>
              </select>
              <div className="decoration">
                <ArrowDropDownIcon />
              </div>
            </div>
          </div>
          <h5 className="description">닉네임</h5>
        </div>

        <footer className="footer">
          <p className="help">한번 결정한 프로필은 나중에 수정할 수 없습니다.</p>
          <button className="button-next" onClick={() => !moveFrame(1) && navigate(`/feed`)}>다음</button>
        </footer>
      </main>
    </div>
  );
};

export default ProfileFrame;