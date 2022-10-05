import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import { NoScroll } from "../../util";

import "./style.scoped.scss";
import ExpandMoreIcon from "../../asset/icons/mui/expand-more-icon";


const Backdrop = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(true);
  const [data, setData] = useState(null);
  
  const show = ({ title="", content=<></> }) => {
    setData({ title: title, content: content, });
    setVisible(true);
  };
  const hide = () => {
    const DELAY = 300;
    setHiding(true);
    setTimeout(() => setVisible(false), DELAY);
  };
  useImperativeHandle(ref, () => ({ show: show, hide: hide, }));

  useEffect(() => {
    if (visible)
      setHiding(false);
  }, [visible]);

  return visible && (
    <div id="backdrop" className={hiding ? "hide" : ""}>
      <header className="header" onClick={() => hide()}>
        <h3 className="title">{data.title}</h3>
        <div className="button-close icon-sm"><ExpandMoreIcon /></div>
      </header>
      <main className="content">{data.content}</main>

      <NoScroll />
    </div>
  );
});

export default Backdrop;