import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Frame, getRandomProfile, getRandomNutList, getRandomNut } from "../../util";
import { UserModel } from "../../models";
import { UserViewModel } from "../../view-models";

import FrameSocial from "./frame-social";
import FrameProfile from "./frame-profile";
import FrameConfirm from "./frame-confirm";

import { getAccountInfo, setAccessToken, setRefreshToken } from "../../store/slices/account";


const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(getAccountInfo);

  const [ tagId, setTagId ] = useState(1);
  const [ nutId, setNutId ] = useState(1);
  const [ profile, setProfile ] = useState({ color: "", emoji: "" });
  const [ errorMessage, setErrorMessage ] = useState(null);

  const changeNut = (id) => setNutId(id);
  const changeProfile = (profile) => setProfile(profile);
  // 음식 태그는 아직 미구현
  const changeTag = (id) => setTagId(id || 1);

  const callSignup = async () => {
    const userViewModel = new UserViewModel(new UserModel());
    const { success, msg, data } = await userViewModel.signup({
      email: account.email,
      providerType: account.providerType,
      providerUid: account.providerUid,
      profileId: 1,
      // 추후 Tag가 생긴다면 변경 필요
      tagId: 1,
      nutId,
      thumb: {
        color: profile.color,
        emoji: profile.emoji
      },
    });
    if (!success) {
      setErrorMessage(msg);
      return;
    }
    dispatch(setAccessToken(data.accessToken));
    dispatch(setRefreshToken(data.refreshToken));
    navigate("/feed");
  };
  
  const frame = new Frame();
  frame.init([
    <FrameSocial
      frame={frame}
      email={account.email}
      providerType={account.providerType}
    />,
    <FrameProfile
      frame={frame}
      changeNut={changeNut}
      changeProfile={changeProfile}
      changeTag={changeTag}
      getTagId={() => tagId}
      getNutId={() => nutId}
      getProfileId={() => profile}
      getRandomProfile={getRandomProfile}
      getRandomNutList={getRandomNutList}

      getRandomNut={getRandomNut}
    />,
    <FrameConfirm
      frame={frame}
      callSignup={callSignup}
      profile={profile}
      email={account.email}
      tagId={tagId}
      nutId={nutId}
      getRandomNutList={getRandomNutList}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};

export default SignupPage;