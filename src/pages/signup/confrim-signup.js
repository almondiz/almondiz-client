import React from "react";

import "./style.scoped.scss";

import FooImage from "../../asset/logo/symbol.png";
import HeaderBeforeIcon from "../../asset/icons/header-before-icon-stroke";

const CheckSocialLogin = ({ moveStep }) => {
  return (
    <>
      <div className="header">
        <div className="header-before-icon" onClick={moveStep(-1)}>
          <HeaderBeforeIcon color="white" />
        </div>
        <p>프로필 생성</p>
      </div>
      <div className="contents">
        <div className="contents-confirm-p">
          <p>이대로 가입하시겠어요?</p>
        </div>
        <div className="contents-profile">
          <img className="contents-profile-img" alt="profile" src={FooImage}/>
        </div>
        <p className="contents-confirm-p">마제멘 호두</p>
        <p className="contents-confirm-email">구글 almondiz@gmail.com</p>
      </div>
      <div className="bottom">
        <div className="bottom-p">
          <p>연동된 소셜 계정은 타인에게 공개되지 않습니다.</p>
        </div>
        <button className="bottom-button point-background" onClick={moveStep(1)}>
          <p>가입하기</p>
        </button>
      </div>
    </>
  );
}

export default CheckSocialLogin;