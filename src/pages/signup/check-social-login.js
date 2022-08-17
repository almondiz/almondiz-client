import React from "react";

import "./style.scoped.scss";

import GoogleSocialImage from "../../asset/social/google.svg";
import HeaderBeforeIcon from "../../asset/icons/header-before-icon-stroke";

const CheckSocialLogin = ({ moveStep }) => {
  return (
    <>
      <div className="header">
        <div className="header-before-icon" onClick={moveStep(-1)}>
          <HeaderBeforeIcon color="white" />
        </div>
        <p>회원가입</p>
      </div>
      <div className="contents">
        <div className="contents-p">
          <p>아래 소셜 계정으로</p>
          <p>가입을 진행합니다.</p>
        </div>
        <img className="contents-social-icon" alt="google" src={GoogleSocialImage} />
        <p className="contents-social-p">almondiz@gmail.com</p>
      </div>
      <div className="bottom">
        <div className="bottom-p">
          <p>다른 계정으로 </p>
          <p className="point-color">로그인 또는 회원가입</p>
        </div>
        <button className="bottom-button point-background" onClick={moveStep(1)}><p>다음</p></button>
      </div>
    </>
  );
}

export default CheckSocialLogin;