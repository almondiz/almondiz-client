import React from "react";

import { Framer } from "../../util";

import FrameTag from "./frame-tag";
import FrameFindShop from "./frame-find-shop";
import FrameDirectRegister from "./frame-direct-register";
import FrameWrite from "./frame-write";

import "./style.scoped.scss";


const Edit = () => {
  /*const [ curStep, setCurStep ] = useState(0);

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

  return (pages[curStep]);*/

  const framer = new Framer();
  framer.init([
    <FrameTag framer={framer} />,
    <FrameFindShop framer={framer} />,
    <FrameDirectRegister framer={framer} />,
    <FrameWrite framer={framer} />,
  ]);

  return (
    <div className="page">
      {framer.view()}
    </div>
  );
};

export default Edit;