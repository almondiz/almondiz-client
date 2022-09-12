import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import SymbolImage from "../../asset/logo/symbol.png";
import LogotypeImage from "../../asset/logo/logotype.svg";
//import AppleSocialImage from "../../asset/social/apple.svg";
import GoogleSocialImage from "../../asset/social/google.svg";
import NaverSocialImage from "../../asset/social/naver.svg";
import KakaoSocialImage from "../../asset/social/kakao.svg";


const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrap">
      <main className="content">
        <div className="brand">
          <img className="symbol" alt="Symbol" src={SymbolImage} />
          <img className="logotype" alt="Logotype" src={LogotypeImage} />
          <p className="description">나만의 맛있는 스크랩북</p>
        </div>
      </main>

      <footer className="footer">
        <div className="social">
          <p className="help">소셜 계정으로 시작하기</p>
          <nav className="social-icons">
            {/*<img className="social-icon" alt="Apple" src={AppleSocialImage} onClick={() => navigate(`/signup`)} />*/}
            <img className="social-icon naver" alt="Naver" src={NaverSocialImage} onClick={() => navigate(`/signup`)} />
            <img className="social-icon google" alt="Google" src={GoogleSocialImage} onClick={() => navigate(`/signup`)} />
            <img className="social-icon kakao" alt="Kakao" src={KakaoSocialImage} onClick={() => navigate(`/signup`)} />
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;