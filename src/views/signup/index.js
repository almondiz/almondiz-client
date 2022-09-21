import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserViewModel from "../../view-models/user";
import { UserModel } from "../../models";

import SocialFrame from "./social";
import ProfileFrame from "./profile";
import ConfirmFrame from "./confirm";

import "./style.scoped.scss";
import { setAccessToken, setRefreshToken } from "../../store/slices/account";


const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const email = useSelector(state => state.account.email);
  const [ currentFrameIndex, setCurrentFrameIndex ] = useState(0);
  const [ tagId, setTagId ] = useState(1);
  const [ nutId, setNutId ] = useState(1);
  const [ profileId, setProfileId ] = useState(1);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const moveFrame = inc => {
    let _currentFrameIndex = currentFrameIndex;
    _currentFrameIndex += inc;
    _currentFrameIndex = Math.min(Math.max(_currentFrameIndex, 0), frames.length - 1);
    if (_currentFrameIndex === currentFrameIndex)   return false;
    setCurrentFrameIndex(_currentFrameIndex);
    return true;
  };
  
  const onChangeNut = () => {
    setNutId(1);
  };
  const onChangeProfile = () => {
    setProfileId(1);
  };
  const onChangeTag = () => {
    setTagId(1);
  };

  const callSignup = async () => {
    const userViewModel = new UserViewModel(new UserModel());
    const { success, msg, data } = await userViewModel.signup({
      email,
      tagId,
      nutId,
      profileId,
    });
    if (!success) {
      setErrorMessage(msg);
      return;
    }
    dispatch(setAccessToken(data.accessToken));
    dispatch(setRefreshToken(data.refreshToken));
    navigate("/feed");
  };

  const frames = [
    <SocialFrame moveFrame={moveFrame} />,
    <ProfileFrame
      moveFrame={moveFrame}
      onChangeNut={onChangeNut}
      onChangeProfile={onChangeProfile}
      onChangeTag={onChangeTag}
      getTagId={() => tagId}
      getNutId={() => nutId}
      getProfileId={() => profileId}
    />,
    <ConfirmFrame moveFrame={moveFrame} callSignup={callSignup} />,
  ];

  return (
    <div className="page-wrap">
      {frames[currentFrameIndex]}
    </div>
  );
};

export default Signup;