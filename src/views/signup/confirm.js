import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


const ConfirmFrame = ({ moveFrame }) => {
  const navigate = useNavigate();

  return (
    <div className="frame-confirm">
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => !moveFrame(-1) && navigate(`/login`)}>
          <BackIcon />
        </button>
        <h3 className="title">프로필 생성</h3>
      </nav>

      <main className="content">
        <p className="description">이대로 가입하시겠어요?</p>
        <div className="profile">
          <div className="thumb" style={{ backgroundColor: "#e1bee7" }}>{`😀`}</div>
          <div className="text-wrap">
            <p className="name">마제멘 호두</p>
            <p className="email">almondiz.ajou@gmail.com</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p className="help">연동한 소셜 계정은 타인에게 드러나지 않습니다.</p>
        <button className="button-next" onClick={() => !moveFrame(1) && navigate(`/feed`)}>가입하기</button>
      </footer>
    </div>
  );
};

export default ConfirmFrame;