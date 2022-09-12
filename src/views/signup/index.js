import React, { useState } from "react";

import SocialFrame from "./social";
import ProfileFrame from "./profile";
import ConfirmFrame from "./confirm";

import "./style.scoped.scss";


const Signup = () => {
  const [ currentFrameIndex, setCurrentFrameIndex ] = useState(0);
  const moveFrame = inc => {
    let _currentFrameIndex = currentFrameIndex;
    _currentFrameIndex += inc;
    _currentFrameIndex = Math.min(Math.max(_currentFrameIndex, 0), frames.length - 1);
    if (_currentFrameIndex === currentFrameIndex)   return false;
    setCurrentFrameIndex(_currentFrameIndex);
    return true;
  };

  const frames = [
    <SocialFrame moveFrame={moveFrame} />,
    <ProfileFrame moveFrame={moveFrame} />,
    <ConfirmFrame moveFrame={moveFrame} />,
  ];

  return (
    <div className="page-wrap">
      {frames[currentFrameIndex]}
    </div>
  );
};

export default Signup;