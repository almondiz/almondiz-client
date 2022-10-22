import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";

import { isEmptyElement, useWindowDimensions } from "../../util";

import "./style.scoped.scss";


const HideOnScroll = ({ headerWrapRef, footerWrapRef }) => {
  const scrollDirection = useSelector(state => state.global.scrollDirection);

  useEffect(() => {
    const headerWrapObj = headerWrapRef.current;
    const footerWrapObj = footerWrapRef.current;

    if (scrollDirection === 1)
      headerWrapObj?.classList.add("hide");
    else
      headerWrapObj?.classList.remove("hide");

    if (scrollDirection === -1)
      footerWrapObj?.classList.add("hide");
    else
      footerWrapObj?.classList.remove("hide");
  }, [scrollDirection]);

  return <></>;
};
const AutoShadow = ({ outerRef }) => {
  const windowDimensions = useWindowDimensions();
  useEffect(() => {
    //console.log("[AutoShadow]", windowDimensions);
    const outerObj = outerRef.current;
    if (document.body.scrollHeight > window.innerHeight)
      outerObj?.classList.add("shadow");
    else
      outerObj?.classList.remove("shadow");
  }, [windowDimensions]);

  return <></>;
};


const Float = forwardRef((_, ref) => {
  const [top, setTop] = useState(<></>);
  const [header, setHeader] = useState(<></>);
  const [footer, setFooter] = useState(<></>);
  const [bottom, setBottom] = useState(<></>);
  useImperativeHandle(ref, () => ({ setTop, setHeader, setFooter, setBottom }));

  const outerRef = useRef();
  const headerWrapRef = useRef();
  const footerWrapRef = useRef();

  const FloatHeader = () => (
    <div className={`float-header-wrap ${!isEmptyElement(top) ? "has-top" : ""}`} ref={headerWrapRef}>
      {top}
      {header}
    </div>
  );
  const FloatFooter = () => (
    <div className={`float-footer-wrap ${!isEmptyElement(bottom) ? "has-bottom" : ""}`} ref={footerWrapRef}>
      {footer}
      {bottom}
    </div>
  );

  return (
    <aside id="float" ref={outerRef}>
      <FloatHeader />
      <FloatFooter />

      <HideOnScroll headerWrapRef={headerWrapRef} footerWrapRef={footerWrapRef} />
      <AutoShadow outerRef={outerRef} />
    </aside>
  );
});

export default Float;