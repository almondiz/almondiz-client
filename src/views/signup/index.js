import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Framer } from "../../util";
import { UserModel } from "../../models";
import { UserViewModel } from "../../view-models";

import FrameSocial from "./frame-social";
import FrameProfile from "./frame-profile";
import FrameConfirm from "./frame-confirm";

import "./style.scoped.scss";
import { setAccessToken, setRefreshToken } from "../../store/slices/account";


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector(state => state.account.email);
  const [ tagId, setTagId ] = useState(1);
  const [ nutId, setNutId ] = useState(1);
  const [ profileId, setProfileId ] = useState(1);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const onChangeNut = () => setNutId(1);
  const onChangeProfile = () => setProfileId(1);
  const onChangeTag = () => setTagId(1);

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

  const framer = new Framer();
  framer.init([
    <FrameSocial framer={framer} />,
    <FrameProfile
      framer={framer}
      onChangeNut={onChangeNut}
      onChangeProfile={onChangeProfile}
      onChangeTag={onChangeTag}
      getTagId={() => tagId}
      getNutId={() => nutId}
      getProfileId={() => profileId}
    />,
    <FrameConfirm framer={framer} callSignup={callSignup} />,
  ]);

  return (
    <div className="page">
      {framer.view()}
    </div>
  );
};

export default Signup;