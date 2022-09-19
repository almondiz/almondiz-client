import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";
import RefreshIcon from "../../asset/icons/mui/refresh-icon";

import ArrowDropDownIcon from "../../asset/icons/mui/arrow-drop-down-icon";


const ProfileFrame = ({
  moveFrame,
  onChangeProfile,
  onChangeNut,
  onChangeTag,
  getProfile,
  getNut,
  getTag,
}) => {
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
          <div className="thumb candidate" style={{ backgroundColor: "#cfd8dc" }}>{`🙈`}</div>
          <div className="thumb candidate" style={{ backgroundColor: "#b2dfdb" }}>{`👾`}</div>
          <div className="thumb" style={{ backgroundColor: "#e1bee7" }}>
            {`😀`}
            <div className="refresh-icon" onClick={onChangeProfile}>
              <RefreshIcon />
            </div>
          </div>
          <h5 className="description">이모지</h5>
        </div>
        <div className="menu-name">
          <div className="name">
            <div className="name-first">
              <input className="field" placeholder="좋아하는 음식" autoFocus onChange={onChangeTag} />
            </div>
            <div className="name-last">
              <select className="field" defaultValue="default" onChange={onChangeNut}>
                {/*<option value="default" disabled>견과류</option>*/}
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
          <p className="help">한번 정한 프로필은 나중에 바꿀 수 없습니다.</p>
          <button className="button-next" onClick={() => !moveFrame(1) && navigate(`/feed`)}>다음</button>
        </footer>
      </main>
    </div>
  );
};

export default ProfileFrame;