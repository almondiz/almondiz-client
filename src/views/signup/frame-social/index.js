import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import GoogleSocialImage from "../../../asset/social/google.svg";

// frame 1
const FrameSocial = ({ frame, email, providerType }) => {
  const navigate = useNavigate();
  const showProviderLogo = (providerType) => {
    if (providerType === "GOOGLE") return (<img className="social-icon google" alt="Google" src={GoogleSocialImage} />);
  }

  return (
    <>
      <nav className="top-nav">
        <button className="button button-back" onClick={() => navigate(-1)}>
          <div className="icon"><ArrowBackIcon /></div>
        </button>
        <h3 className="title">회원 가입</h3>
      </nav>

      <main className="content">
        <p className="description">{`아래의 소셜 계정으로\n가입을 진행합니다.`}</p>
        {showProviderLogo(providerType)}
        <p className="email">{email}</p>

        <footer className="main-footer">
        <p className="help">다른 계정으로 <button onClick={() => navigate(-1)}>로그인 또는 회원 가입</button></p>
        <button className="button button-next" onClick={() => frame.next()}>
          <p>다음</p>
        </button>
      </footer>
      </main>
    </>
  );
};

export default FrameSocial;