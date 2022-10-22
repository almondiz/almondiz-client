import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Frame, getRandomThumb, getRandomNut } from "../../util";
import { UserViewModel } from "../../view-models";

import FrameSocial from "./frame-social";
import FrameProfile from "./frame-profile";
import FrameConfirm from "./frame-confirm";

import { getAccountInfo, setAccessToken, setRefreshToken } from "../../store/slices/account";


const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(getAccountInfo);

  const [ profileThumb, setProfileThumb ] = useState(null);
  const [ profileTag, setProfileTag ] = useState(null);
  const [ profileNut, setProfileNut ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const callSignup = async () => {
    const userViewModel = new UserViewModel();
    const { success, msg, data } = await userViewModel.signup({
      providerType: account.providerType, providerUid: account.providerUid,
      email: account.email,
      profileId: 1,   // ### 이 필드는 뭐임?
      tagId: profileTag.tagId,
      nutId: profileNut.nutId,
      thumb: { emoji: profileThumb.emoji, color: profileThumb.color },
    });
    if (success) {
      const { token, userId } = data;
      const { accessToken, refreshToken } = token;
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(setMyUserId(userId));
      navigate(`/feed`);
    } else {
      setErrorMessage(msg);
    }
  };
  
  const frame = new Frame();
  frame.init([
    <FrameSocial frame={frame} providerType={account.providerType} email={account.email} />,
    <FrameProfile
      frame={frame}
      getRandomThumb={getRandomThumb} getRandomNut={getRandomNut}
      profileThumb={profileThumb} profileTag={profileTag} profileNut={profileNut}
      setProfileThumb={setProfileThumb} setProfileTag={setProfileTag} setProfileNut={setProfileNut}
    />,
    <FrameConfirm
      frame={frame} callSignup={callSignup} email={account.email}
      profileThumb={profileThumb} profileTag={profileTag} profileNut={profileNut}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};

export default SignupPage;