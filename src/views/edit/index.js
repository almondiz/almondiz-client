import React from "react";

import { Framer } from "../../util";

import FrameFindShop from "./frame-find-shop";
import FrameDirect from "./frame-direct";
import FrameDirectTag from "./frame-direct-tag";
import FrameWrite from "./frame-write";

import "./style.scoped.scss";


const Edit = ({ BackdropElement }) => {
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
    <FrameFindShop framer={framer} />,
    <FrameDirect framer={framer} />,
    <FrameDirectTag framer={framer} />,
    <FrameWrite framer={framer} BackdropElement={BackdropElement} />,
  ]);

  return (
    <div className="page">
      {framer.view()}
    </div>
  );
};

export default Edit;