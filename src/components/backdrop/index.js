import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";

import { Phase, NoScroll } from "../../util";

import "./style.scoped.scss";
import ExpandMoreIcon from "../../asset/icons/mui/expand-more-icon";


const Backdrop = forwardRef((_, ref) => {
  const { pathname } = useLocation();
  useEffect(() => { phase.go("hide-in"); }, [pathname]);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(<></>);

  const DELAY = 300;
  const phase = new Phase({
    "hide": () => {
      setVisible(false), setTitle(""), setContent(<></>);
    },
    "hide-out": (_title, _content) => {
      setVisible(true), setTitle(_title), setContent(_content);
      setTimeout(() => phase.go("show"), DELAY);
    },
    "show": () => {},
    "hide-in": () => {
      setTimeout(() => phase.go("hide"), DELAY);
    },
  }, "hide");

  const show = ({ title="", content=<></> }) => {
    phase.is("hide") && phase.go("hide-out", title, content);
  };
  const hide = () => {
    phase.is("show") && phase.go("hide-in");
  };
  useImperativeHandle(ref, () => ({ show: show, hide: hide, }));

  return visible && (
    <div id="backdrop" className={phase.isIn("hide") ? "hide" : ""}>
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