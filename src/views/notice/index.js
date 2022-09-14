import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


const Notice = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrap">
      <div className="frame-social">
        <nav className="navbar">
          <div className="button-back icon-sm" onClick={() => navigate(`/me`)}>
            <BackIcon />
          </div>
          <h3 className="title">알림</h3>
        </nav>

        <main className="content">
          {/*<p className="description">{`아래의 소셜 계정으로\n가입을 진행합니다.`}</p>
          <img className="social-icon google" alt="Google" src={GoogleSocialImage} />
          <p className="email">{`almondiz.ajou@gmail.com`}</p>*/}
        </main>

        <footer className="footer">
          {/*<p className="help">다른 계정으로 <span onClick={() => navigate(`/login`)}>로그인 또는 회원 가입</span></p>
          <button className="button-next" onClick={() => !moveFrame(1) && navigate(`/feed`)}>다음</button>*/}
        </footer>
      </div>
    </div>
  );
};

export default Notice;