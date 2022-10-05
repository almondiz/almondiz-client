import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";

import "./style.scoped.scss";


const HideOnScroll = ({ bottomNav }) => {
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

  useEffect(() => {
    if (bottomNav)
      document.querySelector(".float-footer-wrap").classList.add("has-bottom-nav");
    else
      document.querySelector(".float-footer-wrap").classList.remove("has-bottom-nav");
  }, [bottomNav]);

  return <></>;
};


const Float = forwardRef((_, ref) => {
  const [header, setHeader] = useState(<></>);
  const [footer, setFooter] = useState(<></>);
  const [bottomNav, setBottomNav] = useState(<></>);
  useImperativeHandle(ref, () => ({ setHeader: setHeader, setFooter: setFooter, setBottomNav: setBottomNav }));

  const FloatHeader = () => (
    <div className="float-header-wrap">
      {header}
    </div>
  );
  const FloatFooter = () => (
    <div className="float-footer-wrap">
      {footer}
      {bottomNav}
    </div>
  );

  return (
    <aside className="float">
      <FloatHeader />
      <FloatFooter />

      <HideOnScroll bottomNav={bottomNav} />
    </aside>
  );
});

export default Float;