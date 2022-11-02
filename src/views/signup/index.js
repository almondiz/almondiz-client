import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { UserViewModel, SearchViewModel } from "../../view-models";

import { Frame } from "../../asset/common/controllers";
import { getRandomThumb, getRandomNut } from "../../asset/profile";

import FrameSocial from "./frame-social";
import FrameProfile from "./frame-profile";


const SignupPage = () => {
  const location = useLocation();
  const { providerType, providerUid, email } = location.state.social;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ profileThumb, setProfileThumb ] = useState(null);
  const [ profileTag, setProfileTag ] = useState(null);
  const [ profileNut, setProfileNut ] = useState(null);

  /** 1. USER API */
  const userViewModel = new UserViewModel();
  const callSignup = async () => {
    const success = await userViewModel.signup(
      { providerType, providerUid, email },   
      {
        tagId: profileTag.tagId, nutId: profileNut.nutId, thumb: { emoji: profileThumb.emoji, color: profileThumb.color },
        profileId: 1,   // ### 이 필드는 뭐임?
      },
      { dispatch, navigate }
    );
  };
  /** */

  /** 0. SEARCH API */
  const searchViewModel = new SearchViewModel();
  const searchFoodTag = async (tagName) => (await searchViewModel.searchFoodTag(tagName));
  /** */
  
  const frame = new Frame();
  frame.init([
    <FrameSocial frame={frame} email={email} providerType={providerType} />,
    <FrameProfile
      frame={frame}
      getRandomThumb={getRandomThumb} getRandomNut={getRandomNut}
      profileThumb={profileThumb} profileTag={profileTag} profileNut={profileNut}
      setProfileThumb={setProfileThumb} setProfileTag={setProfileTag} setProfileNut={setProfileNut}
      searchFoodTag={searchFoodTag}
      email={email} callSignup={callSignup}
    />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};
export default SignupPage;