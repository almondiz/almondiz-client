import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";

import { Motion, NoScroll } from "../../util";

import "./style.scoped.scss";
import ExpandMoreIcon from "../../asset/icons/mui/expand-more-icon";


const Backdrop = forwardRef((_, ref) => {
  const { pathname } = useLocation();
  useEffect(() => { motion.go("hide-in"); }, [pathname]);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(<></>);

  const MOTION_DELAY = 300;
  const motion = new Motion({
    "hide": () => {
      setVisible(false), setTitle(""), setContent(<></>);
    },
    "hide-out": (_title, _content) => {
      setVisible(true), setTitle(_title), setContent(_content);
      motion.delay(MOTION_DELAY / 6, "show");
    },
    "show": () => {},
    "hide-in": () => motion.delay(MOTION_DELAY, "hide"),
  }, "hide");

  const show = ({ title="", content=<></> }) => (motion.is("hide") && motion.go("hide-out", [title, content]));
  const hide = () => (motion.is("show") && motion.go("hide-in"));
  useImperativeHandle(ref, () => ({ show: show, hide: hide, }));

  return visible && (
    <div id="backdrop" className={motion.get("hide")}>
      <header className="header" onClick={() => hide()}>
        <h3 className="title">{title}</h3>
        <div className="button-close"><ExpandMoreIcon /></div>
      </header>
      <main className="content">{content}</main>

      <NoScroll />
    </div>
  );
});

export default Backdrop;