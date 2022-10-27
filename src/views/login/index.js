import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { UserViewModel } from "../../view-models";

import { StaticComponentRefs } from "../../util";

import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import NaverLogin from "react-naver-login";
import KakaoLogin from "react-kakao-login";

import "./style.scoped.scss";
import SymbolImage from "../../asset/logo/symbol.png";
import Logotype from "../../asset/logo/logotype";
import GoogleSocialImage from "../../asset/social/google.svg";
import NaverSocialImage from "../../asset/social/naver.svg";
import KakaoSocialImage from "../../asset/social/kakao.svg";


const LoginPage = () => {
  const { toastRef } = StaticComponentRefs;

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userViewModel = new UserViewModel();


  // ### BUG : Google - 시크릿 모드에서는 쿠키 설정이 안 된다며 오류가 발생. 소셜 로그인이 되지 않음
  const loginGoogle = {
    clientId: process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID_NETLIFY,
    onSuccess: async (res) => {
      const providerType = "GOOGLE";
      console.log("[Google]", res);
      const { NT: providerUid, cu: email } = res.getBasicProfile();
      const success = await userViewModel.login({ providerType, providerUid, email, raw: res }, { dispatch, navigate });
    },
  };
  const loginNaver = {
    clientId: process.env.NAVER_CLIENT_ID || process.env.NAVER_CLIENT_ID_NETLIFY,
    callbackUrl: window.location.href,
    onSuccess: async (res) => {
      const providerType = "NAVER";
      console.log("[Naver]", res);
      const { id: providerUid, email } = res;
      const success = await userViewModel.login({ providerType, providerUid, email, raw: res }, { dispatch, navigate });
    },
  };
  const loginKakao = {
    clientId: process.env.KAKAO_CLIENT_ID || process.env.KAKAO_CLIENT_ID_NETLIFY,
    onSuccess: async (res) => {
      const providerType = "KAKAO";
      console.log("[Kakao]", res);
      const providerUid = res?.profile.id;
      const email = res?.profile.kakao_account.email;
      const success = await userViewModel.login({ providerType, providerUid, email, raw: res }, { dispatch, navigate });
    },
  };
  const onFailure = async (res) => {
    toastRef?.current?.error("소셜 로그인이 실패했습니다.");
    console.error("[LoginPage.onFailure]", res);
  };
  
  useEffect(() => {
    const googleStart = () => gapi.client.init({ clientId: loginGoogle.clientId, scope: "email" });
    gapi.load("client:auth2", googleStart);
  }, []);

  
  return (
    <div id="page">
      <main className="content">
        <div className="brand">
          <img className="symbol" alt="Symbol" src={SymbolImage} />
          <div className="logotype"><Logotype /></div>
          <p className="description">나만의 맛있는 스크랩북</p>
        </div>
      </main>
      <footer className="footer">
        <div className="social">
          <p className="help">소셜 계정으로 시작하기</p>
          <nav className="social-icons">
            <NaverLogin
              clientId={loginNaver.clientId} callbackUrl={loginNaver.callbackUrl}
              onSuccess={loginNaver.onSuccess} onFailure={onFailure}
              render={({ onClick }) => <img className="social-icon naver" alt="Naver" src={NaverSocialImage} onClick={onClick} />}
            />
            <GoogleLogin buttonText=""
              clientId={loginGoogle.clientId}
              onSuccess={loginGoogle.onSuccess} onFailure={onFailure}
              render={({ onClick }) => <img className="social-icon google" alt="Google" src={GoogleSocialImage} onClick={onClick} />}
            />
            <KakaoLogin
              token={loginKakao.clientId}
              onSuccess={loginKakao.onSuccess} onFail={onFailure} onLogout={console.info}
              render={({ onClick }) => <img className="social-icon kakao" alt="Kakao" src={KakaoSocialImage} onClick={onClick} />}
            >
              <img className="social-icon kakao" alt="Kakao" src={KakaoSocialImage} onClick={() => navigate(`/signup`)} />
            </KakaoLogin>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;