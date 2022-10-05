import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";

import { isEmptyElement } from "../../util";

import "./style.scoped.scss";


const HideOnScroll = () => {
  const scrollDirection = useSelector(state => state.global.scrollDirection);

  useEffect(() => {
    if (scrollDirection === 1)
      document.querySelector(".float-header-wrap").classList.add("hide");
    else
      document.querySelector(".float-header-wrap").classList.remove("hide");

    if (scrollDirection === -1)
      document.querySelector(".float-footer-wrap").classList.add("hide");
    else
      document.querySelector(".float-footer-wrap").classList.remove("hide");
  }, [scrollDirection])

  return <></>;
};


const Float = forwardRef((_, ref) => {
  const [top, setTop] = useState(<></>);
  const [header, setHeader] = useState(<></>);
  const [footer, setFooter] = useState(<></>);
  const [bottom, setBottom] = useState(<></>);
  useImperativeHandle(ref, () => ({setTop: setTop, setHeader: setHeader, setFooter: setFooter, setBottom: setBottom, }));

  const FloatHeader = () => (
    <div className={`float-header-wrap${!isEmptyElement(top) ? " has-top" : ""}`}>
      {top}
      {header}
    </div>
  );
  const FloatFooter = () => (
    <div className={`float-footer-wrap${!isEmptyElement(bottom) ? " has-bottom" : ""}`}>
      {footer}
      {bottom}
    </div>
  );

  return (
    <aside className="float">
      <FloatHeader />
      <FloatFooter />

      <HideOnScroll />
    </aside>
  );
});

export default Float;