import React from "react";

import SymbolImage from "../../asset/logo/symbol.png";
import LogotypeImage from "../../asset/logo/logotype.svg";

import AppleSocialImage from "../../asset/social/apple.svg";
import GoogleSocialImage from "../../asset/social/google.svg";
import NaverSocialImage from "../../asset/social/naver.svg";
import KakaoSocialImage from "../../asset/social/kakao.svg";

import "./style.scoped.scss";

const LoginPage = () => {
  return (
    <main>
      <div class="brand">
        <div className="symbol" alt="symbol" style={{ backgroundImage: `url(${SymbolImage}` }} />
        <div className="logotype" alt="logotype" style={{ backgroundImage: `url(${LogotypeImage}` }} />
        <p className="description">나만의 맛있는 스크랩북</p>
      </div>

      <div className="socials-wrap">
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