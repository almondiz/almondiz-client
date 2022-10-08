import React from "react";

import { Frame } from "../../util";

import FrameFindShop from "./frame-find-shop";
import FrameDirect from "./frame-direct";
import FrameDirectTag from "./frame-direct-tag";
import FrameWrite from "./frame-write";

import "./style.scoped.scss";


const Edit = ({ floatRef, backdropRef }) => {
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

  const frame = new Frame();
  frame.init([
    <FrameFindShop frame={frame} floatRef={floatRef} />,
    <FrameDirect frame={frame} floatRef={floatRef} />,
    <FrameDirectTag frame={frame} floatRef={floatRef} />,
    <FrameWrite frame={frame} floatRef={floatRef} backdropRef={backdropRef} />,
  ]);

  return (
    <div className="page">{frame.view()}</div>
  );
};

export default Edit;