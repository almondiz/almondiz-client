import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";


// frame 3
const FrameConfirm = ({ frame, callSignup }) => {
  const navigate = useNavigate();

  return (
    <div className="frame frame-confirm">
      <nav className="top-nav">
        <button className="button-back icon-sm" onClick={() => frame.prev()}>
          <ArrowBackIcon />
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
        <button className="button-next" onClick={callSignup}>가입하기</button>
      </footer>
    </div>
  );
};

export default FrameConfirm;