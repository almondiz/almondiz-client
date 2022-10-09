import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";


const FloatController = ({ floatRef }) => {
  const navigate = useNavigate();

  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button-back icon-sm" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </button>
      <h3 className="title">알림</h3>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


const SettingsPage = ({ floatRef }) => {
  return (
    <div className="page">
      <main className="content">
        <ul className="settings-list">
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">최근 본 리뷰</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">좋아한 글</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">댓글 단 글</p>
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
              <p className="title">1:1 문의</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">나의 신고</p>
            </div>
          </li>
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">만든 사람들</p>
            </div>
          </li>
          <br />
          
          {/*<li className="settings-item">
            <div className="text-wrap">
              <p className="title">소셜 로그인 연동</p>
            </div>
          </li>*/}
          <li className="settings-item">
            <div className="text-wrap">
              <p className="title">로그아웃</p>
            </div>
          </li>
          <br />

          <li className="settings-item danger">
            <div className="text-wrap">
              <p className="title">회원 탈퇴</p>
            </div>
          </li>
        </ul>
      </main>

      <FloatController floatRef={floatRef} />
    </div>
  );
};

export default SettingsPage;