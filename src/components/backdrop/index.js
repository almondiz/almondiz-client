import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";

import { Motion } from "../../asset/common/controllers";
import { NoScroll } from "../../asset/common/components";

import "./style.scoped.scss";


const Backdrop = forwardRef((_, ref) => {
  const { pathname } = useLocation();
  useEffect(() => { !motion.is("hide") && motion.go("hide-in"); }, [pathname]);

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<></>);
  const [callback, setCallback] = useState(null);

  const MOTION_DELAY = 500;
  const motion = new Motion({
    "hide": async () => {
      if (callback)   await callback();
      setVisible(false), setContent(<></>), setCallback(null);
    },
    "hide-out": (_content, _callback) => {
      setVisible(true), setContent(_content), setCallback(() => _callback);   // wrapping a function to store it
      motion.delay(100, "show");
    },
    "show": () => {},
    "hide-in": () => motion.delay(MOTION_DELAY, "hide"),
  }, "hide");

  const show = (content=<></>, callback=null) => (motion.is("hide") && motion.go("hide-out", [content, callback]));
  const hide = () => (motion.is("show") && motion.go("hide-in"));
  useImperativeHandle(ref, () => ({ show, hide }));

  return visible && (
    <div id="backdrop" data-motion={motion.get()}>
      <div className="backdrop-content-wrap">
        <div className="backdrop-content">{content}</div>
      </div>

      <div className="backdrop-background" onClick={hide} />
      <NoScroll />
    </div>
  );
});
export default Backdrop;