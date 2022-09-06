import React, { useState } from "react";

import "./style.scoped.scss";

import CheckSocialLogin from "./check-social-login";
import SelectNickName from "./select-nick-name";
import ConfirmSignup from "./confirm-signup";

const SignupPage = () => {
  const [ curStep, setCurStep ] = useState(0);

  const moveStep = (val) => {
    if (curStep + val >= maxStep || curStep + val < 0) return;
    return () => setCurStep(curStep + val);
  };

  const pages = [
    <CheckSocialLogin moveStep={moveStep} />,
    <SelectNickName moveStep={moveStep} />,
    <ConfirmSignup moveStep={moveStep} />,
  ]
  const maxStep = pages.length;

  return (
    <main>
      {pages[curStep]}
    </main>
  );
}

export default SignupPage;