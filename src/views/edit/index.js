import React from "react";

import { Framer } from "../../models/global";

import FrameWriter from "./frame-writer";
import FrameTagger from "./frame-tagger";
import FrameStoreSearch from "./frame-store-search";
import FrameDirectRegister from "./frame-direct-register";

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
    <FrameWriter framer={framer} />,
    <FrameTagger framer={framer} />,
    <FrameStoreSearch framer={framer} />,
    <FrameDirectRegister framer={framer} />,
  ]);

  return (
    <div className="page">
      {framer.view()}
    </div>
  );
};

export default Edit;