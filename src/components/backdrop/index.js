import React, { useState, forwardRef, useImperativeHandle } from "react";

import { NoScroll } from "../../util";

import "./style.scoped.scss";
import ExpandMoreIcon from "../../asset/icons/mui/expand-more-icon";


const Backdrop = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(<></>);
  const [content, setContent] = useState(<></>);
  const show = ({ title="", content=<></> }) => {
    setTitle(title), setContent(content);
    setVisible(true);
  };
  const hide = () => {
    const DELAY = 300;
    setVisible(false);
    setTimeout(() => {
      if (!visible)
        setTitle(""), setContent(<></>);
    }, DELAY);
  };
  useImperativeHandle(ref, () => ({ show: show, hide: hide, }));

  return (
    <div id="backdrop" className={visible ? "show" : ""}>      
      <header className="header" onClick={() => hide()}>
        <h3 className="title">{title}</h3>
        <div className="button-close icon-sm"><ExpandMoreIcon /></div>
      </header>

      <main className="content">{content}</main>

      {visible && <NoScroll />}
    </div>
  );
});

export default Backdrop;