import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { goBack } from "../../util";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";


const Settings = () => {
  const navigate = useNavigate();

  //const makeSettingsList = (userId, idx) => {};

  return (
    <div className="page">
      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <h3 className="title">개인 설정</h3>
      </nav>

      <main className="content">
        <ul className="settings-list">
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">최근 본 리뷰</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">나의 신고</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">1:1 문의</p>
            </div>
          </li>
          <br />

          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">공지사항</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">FAQ</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">버전 정보</p>
              <p className="info">최신 버전 : 1.0.1</p>
            </div>
            <div className="right">1.0.1</div>
          </li>
          <br />
          
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">소셜 로그인 연동</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">로그아웃</p>
            </div>
          </li>
          <li className="settings-item danger">
            <div className="text-wrap">
              <p className="title">회원 탈퇴</p>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Settings;