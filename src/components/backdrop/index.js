import React, { useState, forwardRef, useImperativeHandle } from "react";

import "./style.scoped.scss";
import ExpandMoreIcon from "../../asset/icons/mui/expand-more-icon";


const Backdrop = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(<></>);
  const [content, setContent] = useState(<></>);
  const show = ({ title="", content=<></> }) => {
    setTitle(title), setContent(content);
    setVisible(true);
    document.body.classList.add("noscroll");
  };
  const hide = () => {
    setTitle(""), setContent(<></>);
    setVisible(false);
    document.body.classList.remove("noscroll");
  };
  useImperativeHandle(ref, () => ({ show: show, hide: hide, }));

  return (
    <div id="backdrop" className={visible ? "show" : ""}>
      <header className="header" onClick={() => hide()}>
        <h3 className="title">{title}</h3>
        <div className="button-close icon-sm"><ExpandMoreIcon /></div>
      </header>

      <main className="content">{content}</main>
    </div>
  );
});

export default Backdrop;