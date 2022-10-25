import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs } from "../../util";

import { Frame, getRandomThumb, getRandomNut } from "../../util";
import { UserViewModel, SearchViewModel } from "../../view-models";

import FrameSocial from "./frame-social";
import FrameProfile from "./frame-profile";

import { getAccountInfo, setAccessToken, setRefreshToken } from "../../store/slices/account";


const SignupPage = () => {
  const { toastRef } = StaticComponentRefs;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(getAccountInfo);

  const [ profileThumb, setProfileThumb ] = useState(null);
  const [ profileTag, setProfileTag ] = useState(null);
  const [ profileNut, setProfileNut ] = useState(null);

  /** 1. USER API */
  const userViewModel = new UserViewModel();
  const callSignup = async () => {
    const { success, msg, data } = await userViewModel.signup({
      providerType: account.providerType, providerUid: account.providerUid,
      email: account.email,
      profileId: 1,   // ### 이 필드는 뭐임?
      tagId: profileTag.tagId,
      nutId: profileNut.nutId,
      thumb: { emoji: profileThumb.emoji, color: profileThumb.color },
    });
    if (success) {
      toastRef.current?.show("회원가입되었습니다.");

      const { token, userId } = data;
      const { accessToken, refreshToken } = token;
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(setMyUserId(userId));
      navigate(`/feed`);
    }
  };
  /** */

  /** 0. SEARCH API */
  const searchViewModel = new SearchViewModel();
  const searchFoodTag = async (tagName) => (await searchViewModel.searchFoodTag(tagName));
  /** */
  
  const frame = new Frame();
  frame.init([
    <FrameSocial frame={frame} providerType={account.providerType} email={account.email} />,
    <FrameProfile
      frame={frame}
      getRandomThumb={getRandomThumb} getRandomNut={getRandomNut}
      profileThumb={profileThumb} profileTag={profileTag} profileNut={profileNut}
      setProfileThumb={setProfileThumb} setProfileTag={setProfileTag} setProfileNut={setProfileNut}
      searchFoodTag={searchFoodTag}
      email={account.email} callSignup={callSignup}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};

export default SignupPage;