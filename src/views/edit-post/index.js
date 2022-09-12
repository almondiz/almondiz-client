import React, { useState } from "react";

import "./style.scoped.scss";

import Writer from "./writer";
import Tagger from "./tagger";
import StoreSearch from "./store-search";
import DirectRegister from "./direct-register";

const EditPost = () => {
  const [ curStep, setCurStep ] = useState(0);

  const moveStep = val => {
    if (curStep + val >= maxStep || curStep + val < 0) return;
    return () => setCurStep(curStep + val);
  };

  const pages = [
    <Writer moveStep={moveStep} />,
    <Tagger moveStep={moveStep} />,
    <StoreSearch moveStep={moveStep} />,
    <DirectRegister moveStep={moveStep} />,
  ];
  const maxStep = pages.length;

  return (pages[curStep]);
}

export default EditPost;