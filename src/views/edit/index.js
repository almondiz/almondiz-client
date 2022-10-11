import React from "react";

import { Frame } from "../../util";

import FrameFindShop from "./frame-find-shop";
import FrameDirect from "./frame-direct";
import FrameDirectTag from "./frame-direct-tag";
import FrameWrite from "./frame-write";


const EditPage = ({ floatRef, backdropRef }) => {
  const frame = new Frame();
  frame.init([
    <FrameFindShop frame={frame} floatRef={floatRef} />,
    <FrameDirect frame={frame} floatRef={floatRef} />,
    <FrameDirectTag frame={frame} floatRef={floatRef} />,
    <FrameWrite frame={frame} floatRef={floatRef} backdropRef={backdropRef} />,
  ]);

  return (
    <div id="page">{frame.view()}</div>
  );
};

export default EditPage;