import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.scoped.scss";
import SymbolImage from "../../asset/logo/symbol.png";
import LogotypeImage from "../../asset/logo/logotype.svg";
import AppleSocialImage from "../../asset/social/apple.svg";
import GoogleSocialImage from "../../asset/social/google.svg";
import NaverSocialImage from "../../asset/social/naver.svg";
import KakaoSocialImage from "../../asset/social/kakao.svg";


const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrap">
      <section className="brand">
        <img className="symbol" alt="symbol" src={SymbolImage} />
        <img className="logotype" alt="symbol" src={LogotypeImage} />
        <p className="description">나만의 맛있는 스크랩북</p>
      </section>

      <section className="social">
        <p className="description">소셜 계정으로 시작하기</p>
        <ul className="social-icons">
          {/*<li className="social-icon">
            <img alt="apple" src={AppleSocialImage} onClick={() => navigate(`/signup`)} />
          </li>*/}
          <li className="social-icon">
            <img alt="naver" src={NaverSocialImage} onClick={() => navigate(`/signup`)} />
          </li>
          <li className="social-icon">
            <img alt="google" src={GoogleSocialImage} onClick={() => navigate(`/signup`)} />
          </li>
          <li className="social-icon">
            <img alt="kakao" src={KakaoSocialImage} onClick={() => navigate(`/signup`)} />
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LoginPage;