import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken, setEmail } from "../../store/slices/account";

import { UserModel } from "../../models";
import UserViewModel from "../../view-models/user";

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
    const { cu: email } = res.getBasicProfile();
    dispatch(setEmail(email));
    await userViewModel.checkAccount(
      email,
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

  const clientId = process.env.GOOGLE_CLIENT_ID;
  console.log(process.env.GOOGLE_CLIENT_ID);

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