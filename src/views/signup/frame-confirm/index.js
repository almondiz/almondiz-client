import React from "react";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";


// frame 3
const FrameConfirm = ({
  frame, callSignup, email,
  profileThumb, profileTag, profileNut
}) => {
  return (
    <>
      <nav className="top-nav">
        <button className="button button-back" onClick={() => frame.prev()}>
          <div className="icon"><ArrowBackIcon /></div>
        </button>
        <h3 className="title">프로필 생성</h3>
      </nav>

      <main className="content">
        <p className="description">이대로 가입하시겠어요?</p>
        <div className="profile">
          <div className="thumb" style={{ backgroundColor: profileThumb.color }}>{profileThumb.emoji}</div>
          <div className="text-wrap">
            <p className="name">{profileTag.tagName} {profileNut.nutName}</p>
            <p className="email">{email}</p>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p className="help">연동한 소셜 계정은 타인에게 드러나지 않습니다.</p>
        <button className="button button-next" onClick={callSignup}>
          <p>가입하기</p>
        </button>
      </footer>
    </>
  );
};

export default FrameConfirm;