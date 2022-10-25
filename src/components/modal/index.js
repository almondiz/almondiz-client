import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";

import { Motion, NoScroll } from "../../util";

import "./style.scoped.scss";


const Modal = forwardRef((_, ref) => {
  const { pathname } = useLocation();
  useEffect(() => { motion.go("hide-in"); }, [pathname]);

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<></>);
  const [response, setresponse] = useState(null);

  const MOTION_DELAY = 500;
  const motion = new Motion({
    "hide": async () => {
      if (response)   await response();
      setVisible(false), setContent(<></>), setresponse(null);
    },
    "hide-out": (_content, _response) => {
      setVisible(true), setContent(_content), setresponse(() => _response);   // wrapping a function to store it
      motion.delay(MOTION_DELAY / 6, "show");
    },
    "show": () => {},
    "hide-in": () => motion.delay(MOTION_DELAY, "hide"),
  }, "hide");

  const show = (content=<></>, response=null) => (motion.is("hide") && motion.go("hide-out", [content, response]));
  const hide = () => (motion.is("show") && motion.go("hide-in"));
  useImperativeHandle(ref, () => ({ show, hide }));

  return visible && (
    <div id="modal" data-motion={motion.get()}>
      <div className="modal-content-wrap">
        <div className="modal-content">{content}</div>
      </div>

      <div className="modal-background" onClick={hide} />
      <NoScroll />
    </div>
  );
});

export default Modal;