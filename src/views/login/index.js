import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setProviderUid,
  setEmail,
  setProviderType
} from "../../store/slices/account";

import { UserModel } from "../../models";
import { UserViewModel } from "../../view-models";

import "./style.scoped.scss";
import SymbolImage from "../../asset/logo/symbol.png";
import LogotypeImage from "../../asset/logo/logotype.svg";
//import AppleSocialImage from "../../asset/social/apple.svg";
import GoogleSocialImage from "../../asset/social/google.svg";
import NaverSocialImage from "../../asset/social/naver.svg";
import KakaoSocialImage from "../../asset/social/kakao.svg";

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userViewModel = new UserViewModel(new UserModel());

  const  onSuccess = async (res) => {
    const { cu: email, NT: providerUid } = res.getBasicProfile();
    const providerType = "GOOGLE";
    dispatch(setEmail(email));
    dispatch(setProviderUid(providerUid));
    dispatch(setProviderType(providerType));
    await userViewModel.checkAccount(
      { providerType, providerUid },
      () => navigate(`/signup`),
      ({ accessToken, refreshToken }) => {
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        navigate(`/feed`)
      },
    );
  }

  const onFailure = async (res) => {
    console.log(res);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID_NETLIFY;

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className="page">
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
            <GoogleLogin
              className="google-button"
              clientId={clientId}
              buttonText=""
              render={({ onClick }) => (
                <img
                  onClick={onClick}
                  className="social-icon google"
                  alt="Google"
                  src={GoogleSocialImage}
                />
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
            <img className="social-icon kakao" alt="Kakao" src={KakaoSocialImage} onClick={() => navigate(`/signup`)} />
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;