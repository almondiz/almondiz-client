import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";


// frame 3
const FrameConfirm = ({ frame, callSignup, profile, email, nutId, tagId, getRandomNutList }) => {
  const navigate = useNavigate();
  const nutList = getRandomNutList();
  const getNutName = (id) => nutList.filter(({ id: _id }) => _id === Number(id))[0]?.name;
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
          <div className="thumb" style={{ backgroundColor: profile.color }}>{profile.emoji}</div>
          <div className="text-wrap">
            <p className="name">마제멘 {getNutName(nutId)}</p>
            <p className="email">{email}</p>
          </div>
        </div>

        <footer className="main-footer">
          <p className="help">연동한 소셜 계정은 타인에게 드러나지 않습니다.</p>
          <button className="button button-next" onClick={callSignup}>가입하기</button>
        </footer>
      </main>
    </>
  );
};

export default FrameConfirm;