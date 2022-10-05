import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";

import BottomNav from "../bottom-nav";

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

  return <></>;
};


const Float = forwardRef((_, ref) => {
  const [header, setHeader] = useState(<></>);
  const [footer, setFooter] = useState(<></>);
  const [bottomNav, setBottomNav] = useState(false);
  useImperativeHandle(ref, () => ({ setHeader: setHeader, setFooter: setFooter, setBottomNav: setBottomNav }));

  const FloatHeader = () => (
    <div className={`float-header-wrap`}>
      {header}
    </div>
  );
  const FloatFooter = () => (
    <div className={`float-footer-wrap${bottomNav ? " has-bottom-nav" : ""}`}>
      {footer}
      {bottomNav && <BottomNav />}
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