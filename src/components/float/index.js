import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
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
  }, [scrollDirection]);

  return <></>;
};


const Float = forwardRef((_, ref) => {
  const [top, setTop] = useState(<></>);
  const [header, setHeader] = useState(<></>);
  const [footer, setFooter] = useState(<></>);
  const [bottom, setBottom] = useState(<></>);
  useImperativeHandle(ref, () => ({setTop: setTop, setHeader: setHeader, setFooter: setFooter, setBottom: setBottom, }));

  const { pathname } = useLocation();
  useEffect(() => {
    const floatDOM = document.querySelector("#float");
    if (document.body.scrollHeight <= window.innerHeight)
      floatDOM.classList.add("noshadow");
    else
      floatDOM.classList.remove("noshadow");
  }, [pathname, top, bottom]);

  const FloatHeader = () => (
    <div className={`float-header-wrap ${!isEmptyElement(top) ? "has-top" : ""}`}>
      {top}
      {header}
    </div>
  );
  const FloatFooter = () => (
    <div className={`float-footer-wrap ${!isEmptyElement(bottom) ? "has-bottom" : ""}`}>
      {footer}
      {bottom}
    </div>
  );

  return (
    <aside id="float">
      <FloatHeader />
      <FloatFooter />

      <HideOnScroll />
    </aside>
  );
});

export default Float;