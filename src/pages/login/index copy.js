import React from "react";

//import SymbolImage from "../../asset/logo/symbol.png";
//import LogotypeImage from "../../asset/logo/logotype.png";

import AppleSocialImage from "../../asset/social/apple.svg";
import GoogleSocialImage from "../../asset/social/google.svg";
import NaverSocialImage from "../../asset/social/naver.svg";
import KakaoSocialImage from "../../asset/social/kakao.svg";

import "./style.scss";

const LoginPage = () => {
  return (
    <main>
      <div className="symbol" alt="symbol" style={{ backgroundColor: "var(--secondary-text-color)" }} />
      <p style={{ fontSize: "1.25rem", marginBottom: 0 }}>나만의 맛있는 스크랩북</p>
      <div className="logotype" alt="logotype" style={{ backgroundColor: "var(--secondary-text-color)" }} />

      <div className="socials-wrapper">
        <p style={{ fontSize: "0.75rem", marginBottom: "1rem" }}>소셜 계정으로 시작하기</p>
        <ul className="socials">
          <li className="icon">
            <img alt="apple" src={AppleSocialImage} />
          </li>
          <li className="icon">
            <img alt="google" src={GoogleSocialImage} />
          </li>
          <li className="icon">
            <img alt="naver" src={NaverSocialImage} />
          </li>
          <li className="icon">
            <img alt="kakao" src={KakaoSocialImage} />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default LoginPage;